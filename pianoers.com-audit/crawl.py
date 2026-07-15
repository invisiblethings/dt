import json, time, re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

urls = json.load(open('all_sitemap_urls.json'))
content_urls = urls['sitemap-pages'] + urls['sitemap-posts']
print("Crawling", len(content_urls), "pages")

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; SEOAuditBot/1.0; +https://pianoers.com)"}

pages = {}
errors = {}

for i, url in enumerate(content_urls):
    try:
        r = requests.get(url, timeout=20, headers=HEADERS)
        soup = BeautifulSoup(r.text, 'lxml')
        title = soup.title.string.strip() if soup.title and soup.title.string else None
        desc_tag = soup.find('meta', attrs={'name': 'description'})
        desc = desc_tag['content'].strip() if desc_tag and desc_tag.get('content') else None
        h1s = [h.get_text(strip=True) for h in soup.find_all('h1')]
        h2s = [h.get_text(strip=True) for h in soup.find_all('h2')]
        canonical_tag = soup.find('link', rel='canonical')
        canonical = canonical_tag['href'] if canonical_tag else None
        og_title = soup.find('meta', property='og:title')
        og_desc = soup.find('meta', property='og:description')
        og_image = soup.find('meta', property='og:image')
        robots_meta = soup.find('meta', attrs={'name': 'robots'})
        jsonld_blocks = soup.find_all('script', type='application/ld+json')
        jsonld_types = []
        for b in jsonld_blocks:
            try:
                data = json.loads(b.string)
                if isinstance(data, list):
                    for d in data:
                        jsonld_types.append(d.get('@type'))
                else:
                    jsonld_types.append(data.get('@type'))
            except Exception:
                jsonld_types.append('PARSE_ERROR')
        imgs = soup.find_all('img')
        imgs_missing_alt = [img.get('src') for img in imgs if not img.get('alt', '').strip()]
        body_text = soup.get_text(separator=' ', strip=True)
        word_count = len(body_text.split())
        links = soup.find_all('a', href=True)
        internal_links = [a['href'] for a in links if 'pianoers.com' in a['href'] or a['href'].startswith('/')]
        external_links = [a['href'] for a in links if a['href'].startswith('http') and 'pianoers.com' not in a['href']]
        nofollow_external = [a['href'] for a in links if a.get('rel') and 'nofollow' in a.get('rel') and a['href'].startswith('http') and 'pianoers.com' not in a['href']]

        pages[url] = {
            'status_code': r.status_code,
            'title': title,
            'title_len': len(title) if title else 0,
            'meta_description': desc,
            'meta_description_len': len(desc) if desc else 0,
            'h1_count': len(h1s),
            'h1s': h1s,
            'h2_count': len(h2s),
            'canonical': canonical,
            'og_title': og_title['content'] if og_title else None,
            'og_description': og_desc['content'] if og_desc else None,
            'og_image': og_image['content'] if og_image else None,
            'robots_meta': robots_meta['content'] if robots_meta else None,
            'jsonld_types': jsonld_types,
            'image_count': len(imgs),
            'images_missing_alt_count': len(imgs_missing_alt),
            'images_missing_alt_sample': imgs_missing_alt[:5],
            'word_count': word_count,
            'internal_link_count': len(internal_links),
            'external_link_count': len(external_links),
            'external_links_sample': list(set(external_links))[:10],
            'nofollow_external_count': len(nofollow_external),
        }
    except Exception as e:
        errors[url] = str(e)
    if i % 10 == 0:
        print(f"  {i+1}/{len(content_urls)}")
    time.sleep(0.3)

json.dump({'pages': pages, 'errors': errors}, open('crawl_data.json', 'w'), indent=2)
print("DONE. Pages:", len(pages), "Errors:", len(errors))
