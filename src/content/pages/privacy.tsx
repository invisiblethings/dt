import Link from 'next/link';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { localizedPath, type Locale } from '@/i18n/config';
import { pageMetadata } from '@/lib/seo';

const META: Record<Locale, { title: string; description: string; h1: string; lede: string }> = {
  en: {
    title: 'Privacy: Your Puzzles Stay in Your Browser',
    description:
      'This site generates puzzles and builds PDFs in your browser. It has no accounts and sends no puzzle data to a server. This page lists what the host does log.',
    h1: 'Privacy',
    lede: 'Your device makes your puzzles, and they go nowhere else. The details follow, including the logging that comes with any website.',
  },
  de: {
    title: 'Datenschutz: Deine Rätsel bleiben in deinem Browser',
    description:
      'Diese Website erzeugt Rätsel und baut PDFs in deinem Browser. Sie hat keine Konten und schickt keine Rätseldaten an einen Server. Diese Seite nennt, was der Hoster protokolliert.',
    h1: 'Datenschutz',
    lede: 'Dein Gerät erzeugt deine Rätsel, und sie gehen nirgendwo anders hin. Die Einzelheiten folgen, auch zu den Protokollen, die zu jeder Website gehören.',
  },
  fr: {
    title: 'Confidentialité : vos grilles restent dans votre navigateur',
    description:
      'Ce site génère les grilles et fabrique les PDF dans votre navigateur. Il n’a pas de comptes et n’envoie aucune donnée de grille à un serveur. Cette page indique ce que l’hébergeur enregistre.',
    h1: 'Confidentialité',
    lede: 'Votre appareil fabrique vos grilles, et elles ne vont nulle part ailleurs. Les détails suivent, y compris les journaux qui accompagnent tout site web.',
  },
  es: {
    title: 'Privacidad: tus sudokus se quedan en tu navegador',
    description:
      'Este sitio genera sudokus y crea los PDF en tu navegador. No tiene cuentas y no envía datos de sudokus a ningún servidor. Esta página indica qué registra el alojamiento.',
    h1: 'Privacidad',
    lede: 'Tu dispositivo crea tus sudokus, y no van a ningún otro sitio. Los detalles vienen a continuación, incluidos los registros que acompañan a cualquier sitio web.',
  },
};

export function getPrivacyMetadata(locale: Locale) {
  const t = META[locale];
  return pageMetadata({ title: t.title, description: t.description, path: '/privacy', locale });
}

function Body({ locale }: { locale: Locale }) {
  if (locale === 'de') {
    return (
      <div className="prose-press mt-8 max-w-prose">
        <h2>Was mit den Rätseln passiert, die du erzeugst</h2>
        <p>
          Deine Rätsel bleiben in deinem Browser. Wenn du auf „PDF erstellen“ klickst, baut
          JavaScript auf deinem eigenen Gerät die Rätsel, prüft jedes mit einem Lösungsalgorithmus
          und setzt das PDF zusammen. Der Download-Link zeigt auf eine Datei im Speicher deines
          Browsers, und kein Server hat eine Kopie.
        </p>
        <p>
          Wir führen keine Aufzeichnung dessen, was du erzeugt hast: Schwierigkeit, Rätselanzahl und
          Raster erreichen uns nie. Wir könnten dir deine früheren Auflagen nicht zeigen, selbst
          wenn du danach fragst. Beim Schließen des Tabs verschwinden sie.
        </p>

        <h2>Konten und persönliche Daten</h2>
        <p>
          Die Website hat keine Konten, du musst dich also nirgends anmelden, und wir speichern
          keine Passwörter. Wir fragen weder nach deinem Namen noch nach deiner E-Mail-Adresse, wir
          betreiben keinen Newsletter, und kein Formular auf dieser Website sammelt persönliche
          Informationen. Wir haben keine persönlichen Daten, also können wir auch keine verkaufen
          oder teilen.
        </p>

        <h2>Cookies und lokaler Speicher</h2>
        <p>
          Diese Website setzt keine eigenen Cookies und schreibt deine Einstellungen nicht in den
          lokalen Speicher. Deine Wahl von Schwierigkeit und Layout existiert nur, solange du auf
          der Seite bist, und verschwindet, sobald du sie verlässt.
        </p>

        <h2>Analyse-Tools</h2>
        <p>
          Diese Bereitstellung enthält kein Analyse-Skript, keine Werbe-Tags und keine Tracker von
          Drittanbietern. Fügen wir später Analyse-Tools hinzu, aktualisieren wir zuerst diese Seite
          und nennen, was erfasst wird und von wem.
        </p>

        <h2>Hosting und Server-Protokolle</h2>
        <p>
          Unser Hosting-Anbieter Netlify liefert die Website als statische Seiten aus. Wie die
          meisten Webhoster erfasst Netlify Standard-Zugriffsprotokolle, darunter IP-Adresse,
          Zeitstempel, angeforderte Seite und Browser-Kennung, um Seiten auszuliefern und Missbrauch
          zu verhindern. Solche Protokolle entstehen bei jeder Website, die du besuchst. Wir werten
          sie nicht aus, und sie enthalten nichts über deine Rätsel, weil deine Rätsel den Server
          nie erreichen.
        </p>

        <h2>Schriftarten und Drittanbieter-Anfragen</h2>
        <p>
          Diese Website liefert ihre drei Schriftarten von der eigenen Domain statt von Google Fonts
          aus, sodass beim Laden einer Seite kein Schriftanbieter von deinem Besuch erfährt. Auch
          die PDF-Bibliothek ist in die Website eingebettet und kommt von unserer eigenen Domain.
          Beim Surfen auf dieser Website sollte dein Browser keinen Dritten kontaktieren.
        </p>

        <h2>Kinder</h2>
        <p>
          Die Website eignet sich für Kinder und erfasst von Besuchern jeden Alters nichts. Sie hat
          keine nutzergenerierten Inhalte, keine Nachrichtenfunktion und keine Möglichkeit,
          Informationen einzureichen.
        </p>

        <h2>Änderungen an dieser Seite</h2>
        <p>
          Ändern wir, wie die Website mit Daten umgeht, etwa durch Analyse-Tools oder einen
          eingebetteten Dienst, aktualisieren wir diese Seite. Zuletzt aktualisiert am 4. Februar
          2026.
        </p>
      </div>
    );
  }

  if (locale === 'fr') {
    return (
      <div className="prose-press mt-8 max-w-prose">
        <h2>Ce qui arrive aux grilles que vous générez</h2>
        <p>
          Vos grilles restent dans votre navigateur. Quand vous cliquez sur « Générer le PDF », du
          JavaScript exécuté sur votre propre appareil construit les grilles, vérifie chacune avec
          un solveur et assemble le PDF. Le lien de téléchargement pointe vers un fichier conservé
          dans la mémoire de votre navigateur, et aucun serveur n’en garde de copie.
        </p>
        <p>
          Nous ne gardons aucune trace de ce que vous avez généré : la difficulté, le nombre de
          grilles et les grilles ne nous parviennent jamais. Nous ne pourrions pas vous montrer vos
          tirages précédents même si vous le demandiez. Fermer l’onglet les efface.
        </p>

        <h2>Comptes et données personnelles</h2>
        <p>
          Le site n’a pas de comptes : vous n’avez rien à créer, et nous ne stockons aucun mot de
          passe. Nous ne demandons ni votre nom ni votre adresse e-mail, nous n’avons pas de
          newsletter, et aucun formulaire de ce site ne collecte d’informations personnelles. Nous
          ne détenons aucune donnée personnelle, donc nous n’en avons aucune à vendre ou à partager.
        </p>

        <h2>Cookies et stockage local</h2>
        <p>
          Ce site ne dépose aucun cookie qui lui soit propre et n’écrit pas vos réglages dans le
          stockage local. Vos choix de difficulté et de mise en page n’existent que pendant que vous
          êtes sur la page et disparaissent quand vous la quittez.
        </p>

        <h2>Mesure d’audience</h2>
        <p>
          Ce déploiement ne comporte aucun script d’analyse, aucune balise publicitaire et aucun
          traceur tiers. Si nous ajoutons une mesure d’audience plus tard, nous mettrons d’abord
          cette page à jour pour indiquer ce qu’elle collecte et qui la collecte.
        </p>

        <h2>Hébergement et journaux serveur</h2>
        <p>
          Notre hébergeur, Netlify, sert le site sous forme de pages statiques. Comme la plupart des
          hébergeurs, Netlify enregistre des journaux de requêtes standards, dont l’adresse IP,
          l’horodatage, la page demandée et l’identifiant du navigateur, pour livrer les pages et
          prévenir les abus. Tout site que vous visitez produit ces journaux. Nous ne les analysons
          pas, et ils ne contiennent rien sur vos grilles, puisque vos grilles n’atteignent jamais
          le serveur.
        </p>

        <h2>Polices et requêtes vers des tiers</h2>
        <p>
          Ce site sert ses trois polices depuis son propre domaine au lieu de Google Fonts : charger
          une page n’apprend donc à aucun fournisseur de polices que vous êtes venu. Nous intégrons
          aussi la bibliothèque PDF au site et la chargeons depuis notre propre domaine. Naviguer
          sur ce site ne devrait amener votre navigateur à contacter aucun tiers.
        </p>

        <h2>Enfants</h2>
        <p>
          Le site convient aux enfants et ne collecte rien auprès des visiteurs, quel que soit leur
          âge. Il n’a ni contenu généré par les utilisateurs, ni messagerie, ni moyen de soumettre
          des informations.
        </p>

        <h2>Modifications de cette page</h2>
        <p>
          Si nous changeons la façon dont le site traite les données, par exemple en ajoutant une
          mesure d’audience ou un service intégré, nous mettrons cette page à jour. Dernière mise à
          jour le 4 février 2026.
        </p>
      </div>
    );
  }

  if (locale === 'es') {
    return (
      <div className="prose-press mt-8 max-w-prose">
        <h2>Qué pasa con los sudokus que generas</h2>
        <p>
          Tus sudokus se quedan en tu navegador. Cuando pulsas «Generar PDF», JavaScript que se
          ejecuta en tu propio dispositivo construye los sudokus, comprueba cada uno con un
          solucionador y monta el PDF. El enlace de descarga apunta a un archivo guardado en la
          memoria de tu navegador, y ningún servidor guarda una copia.
        </p>
        <p>
          No guardamos registro de lo que has generado: la dificultad, el número de sudokus y las
          cuadrículas nunca nos llegan. No podríamos mostrarte tus tiradas anteriores aunque nos lo
          pidieras. Al cerrar la pestaña, desaparecen.
        </p>

        <h2>Cuentas y datos personales</h2>
        <p>
          El sitio no tiene cuentas, así que no tienes que registrarte y no guardamos contraseñas.
          No te pedimos tu nombre ni tu correo electrónico, no tenemos boletín, y ningún formulario
          de este sitio recopila información personal. No tenemos datos personales, así que no
          podemos venderlos ni compartirlos.
        </p>

        <h2>Cookies y almacenamiento local</h2>
        <p>
          Este sitio no instala cookies propias ni guarda tus ajustes en el almacenamiento local.
          Tus elecciones de dificultad y diseño existen mientras estás en la página y desaparecen
          cuando te vas.
        </p>

        <h2>Analítica</h2>
        <p>
          Este despliegue no incluye ningún script de analítica, ninguna etiqueta publicitaria ni
          rastreadores de terceros. Si más adelante añadimos analítica, actualizaremos antes esta
          página para indicar qué recopila y quién lo recopila.
        </p>

        <h2>Alojamiento y registros del servidor</h2>
        <p>
          Nuestro proveedor de alojamiento, Netlify, sirve el sitio como páginas estáticas. Como la
          mayoría de los alojamientos web, Netlify registra los datos habituales de las peticiones,
          como la dirección IP, la fecha y hora, la página solicitada y el identificador del
          navegador, para entregar las páginas y prevenir abusos. Cualquier sitio que visitas genera
          estos registros. No los analizamos, y no contienen nada sobre tus sudokus, porque tus
          sudokus nunca llegan al servidor.
        </p>

        <h2>Tipografías y peticiones a terceros</h2>
        <p>
          Este sitio sirve sus tres tipografías desde su propio dominio en lugar de Google Fonts,
          así que cargar una página no le dice a ningún proveedor de fuentes que has estado aquí.
          También incluimos la librería de PDF en el sitio y la cargamos desde nuestro propio
          dominio. Navegar por este sitio no debería hacer que tu navegador contacte con ningún
          tercero.
        </p>

        <h2>Menores</h2>
        <p>
          El sitio es adecuado para menores y no recopila nada de ningún visitante, sea cual sea su
          edad. No tiene contenido generado por usuarios, ni mensajería, ni forma de enviar
          información.
        </p>

        <h2>Cambios en esta página</h2>
        <p>
          Si cambiamos la forma en que el sitio trata los datos, por ejemplo añadiendo analítica o
          un servicio integrado, actualizaremos esta página. Última actualización el 4 de febrero de
          2026.
        </p>
      </div>
    );
  }

  return (
    <div className="prose-press mt-8 max-w-prose">
      <h2>What happens to the puzzles you generate</h2>
      <p>
        Your puzzles stay in your browser. When you press Generate, JavaScript on your own device
        builds the puzzles, checks each with a solver and assembles the PDF. The download link
        points at a file in your browser&rsquo;s memory, and no server holds a copy.
      </p>
      <p>
        We keep no record of what you generated: your difficulty, your puzzle count and the grids
        never reach us. We could not show you your previous runs if you asked. Closing the tab
        discards them.
      </p>

      <h2>Accounts and personal data</h2>
      <p>
        The site has no accounts, so you have nothing to sign up for and we store no passwords. We
        do not ask for your name or email address, we run no newsletter, and no form on this site
        collects personal information. We hold no personal data, so we have none to sell or share.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        This site sets no cookies of its own and does not write your settings to local storage. Your
        difficulty and layout choices live in the page while you are on it and disappear when you
        leave.
      </p>

      <h2>Analytics</h2>
      <p>
        This deployment ships with no analytics script, advertising tags or third-party trackers. If
        we add analytics later, we will update this page first to say what it collects and who
        collects it.
      </p>

      <h2>Hosting and server logs</h2>
      <p>
        Netlify, our hosting provider, serves the site as static pages. Like most web hosts, Netlify
        records standard request logs, including IP address, timestamp, the page requested and
        browser user agent, to deliver pages and prevent abuse. Any website you visit generates
        these logs. We do not analyse them, and they contain nothing about your puzzles, because
        your puzzles never reach the server.
      </p>

      <h2>Fonts and third-party requests</h2>
      <p>
        This site serves its three typefaces from its own domain instead of Google Fonts, so loading
        a page tells no font provider that you visited. We bundle the PDF library with the site and
        load it from our own domain too. Browsing this site should not make your browser contact a
        third party.
      </p>

      <h2>Children</h2>
      <p>
        The site suits children and collects nothing from visitors of any age. It has no
        user-generated content, no messaging and no way for a visitor to submit information.
      </p>

      <h2>Changes to this page</h2>
      <p>
        If we change how the site handles data, for example by adding analytics or an embedded
        service, we will update this page. Last updated 4 February 2026.
      </p>
    </div>
  );
}

const MORE_LINK: Record<Locale, { pre: string; label: string; post: string }> = {
  en: { pre: 'More on how the generator works on the ', label: 'about page', post: '.' },
  de: { pre: 'Mehr dazu, wie der Generator funktioniert, auf der ', label: 'Über-uns-Seite', post: '.' },
  fr: { pre: 'Pour en savoir plus sur le fonctionnement du générateur, voir la page ', label: 'à propos', post: '.' },
  es: { pre: 'Más información sobre cómo funciona el generador en la página ', label: 'acerca de', post: '.' },
};

export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = META[locale];
  const m = MORE_LINK[locale];
  return (
    <Shell className="py-10 shelf:py-14">
      <PageHero h1={t.h1} lede={t.lede} />
      <Body locale={locale} />
      <p className="mt-10 text-[15px] text-ink-soft">
        {m.pre}
        <Link href={localizedPath(locale, '/about')} className="font-medium text-stamp underline underline-offset-2">
          {m.label}
        </Link>
        {m.post}
      </p>
    </Shell>
  );
}
