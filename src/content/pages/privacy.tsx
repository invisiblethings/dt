import Link from 'next/link';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { localizedPath, type Locale } from '@/i18n/config';
import { pageMetadata } from '@/lib/seo';

const META: Record<Locale, { title: string; description: string; h1: string; lede: string }> = {
  en: {
    title: 'Privacy — Nothing Leaves Your Browser',
    description:
      'This site generates puzzles and builds PDFs entirely in your browser. No accounts, no puzzle data sent to a server, and a plain account of what is collected.',
    h1: 'Privacy',
    lede: 'The short version: your puzzles are made on your own machine and never sent anywhere. The longer version is below, including the parts that are true of any website.',
  },
  de: {
    title: 'Datenschutz — Nichts verlässt deinen Browser',
    description:
      'Diese Website erzeugt Rätsel und baut PDFs vollständig in deinem Browser. Keine Konten, keine Rätseldaten an einen Server, und eine schlichte Übersicht, was erfasst wird.',
    h1: 'Datenschutz',
    lede: 'Kurz gefasst: Deine Rätsel entstehen auf deinem eigenen Gerät und werden nirgendwohin geschickt. Die längere Fassung folgt unten, einschließlich der Teile, die für jede Website gelten.',
  },
  fr: {
    title: 'Confidentialité — Rien ne quitte votre navigateur',
    description:
      'Ce site génère les grilles et fabrique les PDF entièrement dans votre navigateur. Aucun compte, aucune donnée de grille envoyée à un serveur, et un compte-rendu simple de ce qui est collecté.',
    h1: 'Confidentialité',
    lede: 'En bref : vos grilles sont fabriquées sur votre propre machine et ne sont jamais envoyées où que ce soit. La version détaillée suit, y compris ce qui vaut pour n’importe quel site web.',
  },
  es: {
    title: 'Privacidad — Nada sale de tu navegador',
    description:
      'Este sitio genera sudokus y crea PDF por completo en tu navegador. Sin cuentas, sin datos de sudokus enviados a ningún servidor, y una explicación clara de qué se recopila.',
    h1: 'Privacidad',
    lede: 'La versión corta: tus sudokus se hacen en tu propio dispositivo y nunca se envían a ningún sitio. La versión larga viene a continuación, incluida la parte que es cierta para cualquier sitio web.',
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
          Nichts verlässt deinen Browser. Wenn du auf „Erstellen“ klickst, baut JavaScript auf deinem
          eigenen Gerät die Rätsel, prüft jedes mit einem Lösungsalgorithmus und setzt das PDF zusammen.
          Der Download-Link zeigt auf eine Datei im Speicher deines Browsers, nicht auf einen Server.
        </p>
        <p>
          Dadurch gibt es nirgendwo eine Aufzeichnung dessen, was du erzeugt hast — weder deine
          Schwierigkeit noch deine Rätselanzahl noch die Raster selbst. Wir könnten dir deine früheren
          Auflagen nicht zeigen, selbst wenn du danach fragst, weil sie nie bei uns lagen. Beim Schließen
          des Tabs sind sie weg.
        </p>

        <h2>Konten und persönliche Daten</h2>
        <p>
          Es gibt keine Konten, also gibt es nichts, wofür man sich anmelden müsste, und kein Passwort
          zu speichern. Wir fragen weder nach deinem Namen noch nach deiner E-Mail-Adresse, es gibt
          keinen Newsletter und kein Formular auf dieser Website, das persönliche Informationen
          sammelt. Wir verkaufen oder teilen keine persönlichen Daten, weil wir keine haben, die wir
          verkaufen oder teilen könnten.
        </p>

        <h2>Cookies und lokaler Speicher</h2>
        <p>
          Diese Website setzt keine eigenen Cookies und schreibt deine Einstellungen nicht in den
          lokalen Speicher. Deine Wahl von Schwierigkeit und Layout existiert nur, solange du auf der
          Seite bist, und ist weg, sobald du sie verlässt.
        </p>

        <h2>Analyse-Tools</h2>
        <p>
          Diese Bereitstellung enthält kein Analyse-Skript, keine Werbe-Tags und keine Tracker von
          Drittanbietern. Sollten später Analyse-Tools hinzukommen, wird diese Seite entsprechend
          aktualisiert, mit Angabe, was erfasst wird und von wem — vorher, nicht nachher.
        </p>

        <h2>Hosting und Server-Protokolle</h2>
        <p>
          Die Website wird als statische Seiten von einem Hosting-Anbieter ausgeliefert (Netlify). Wie
          im Grunde jeder Webhost erfasst der Anbieter Standard-Zugriffsprotokolle — IP-Adresse,
          Zeitstempel, angeforderte Seite, Browser-Kennung — zur Auslieferung und zum Schutz vor
          Missbrauch. Das ist Teil davon, überhaupt im Internet zu sein, nicht etwas, das diese Website
          mit deinen Daten anstellt; wir werten diese Protokolle nicht aus, und sie enthalten nichts über
          die Rätsel, die du erzeugt hast, weil deine Rätsel den Server nie erreichen.
        </p>

        <h2>Schriftarten und Drittanbieter-Anfragen</h2>
        <p>
          Die drei hier verwendeten Schriftarten werden von der eigenen Domain dieser Website
          ausgeliefert statt von Google Fonts, sodass beim Laden einer Seite kein Schriftanbieter erfährt,
          dass du hier warst. Die PDF-Bibliothek ist ebenso in die Website eingebettet und wird von
          unserer eigenen Domain geladen. Beim Surfen auf dieser Website sollte dein Browser keinen
          Dritten kontaktieren müssen.
        </p>

        <h2>Kinder</h2>
        <p>
          Die Website ist für Kinder geeignet und erfasst von niemandem, egal welchen Alters, irgendetwas.
          Es gibt keine nutzergenerierten Inhalte, keine Nachrichtenfunktion und keine Möglichkeit für
          Besucher, Informationen einzureichen.
        </p>

        <h2>Änderungen an dieser Seite</h2>
        <p>
          Ändert sich, wie die Website mit Daten umgeht — Analyse-Tools, ein eingebetteter Dienst, egal
          was — ändert sich diese Seite entsprechend mit. Zuletzt aktualisiert am 4. Februar 2026.
        </p>
      </div>
    );
  }

  if (locale === 'fr') {
    return (
      <div className="prose-press mt-8 max-w-prose">
        <h2>Ce qui arrive aux grilles que vous générez</h2>
        <p>
          Rien ne quitte votre navigateur. Quand vous cliquez sur Générer, du JavaScript exécuté sur
          votre propre appareil construit les grilles, vérifie chacune avec un solveur et assemble le
          PDF. Le lien de téléchargement pointe vers un fichier conservé dans la mémoire de votre
          navigateur, pas sur un serveur.
        </p>
        <p>
          Il n’existe donc nulle part de trace de ce que vous avez généré — ni votre difficulté, ni votre
          nombre de grilles, ni les grilles elles-mêmes. Nous ne pourrions pas vous montrer vos tirages
          précédents même si vous le demandiez, car ils ne nous ont jamais appartenu. Fermer l’onglet
          les efface.
        </p>

        <h2>Comptes et données personnelles</h2>
        <p>
          Il n’y a pas de compte, donc rien à créer et aucun mot de passe à conserver. Nous ne demandons
          ni votre nom ni votre adresse e-mail, il n’y a pas de newsletter, et aucun formulaire de ce
          site ne collecte d’informations personnelles. Nous ne vendons ni ne partageons de données
          personnelles, car nous n’en avons aucune à vendre ou à partager.
        </p>

        <h2>Cookies et stockage local</h2>
        <p>
          Ce site ne dépose aucun cookie qui lui soit propre et n’écrit pas vos réglages dans le stockage
          local. Vos choix de difficulté et de mise en page n’existent que pendant que vous êtes sur la
          page et disparaissent quand vous la quittez.
        </p>

        <h2>Mesure d’audience</h2>
        <p>
          Ce déploiement ne comporte aucun script d’analyse, aucune balise publicitaire et aucun traceur
          tiers. Si une mesure d’audience était ajoutée plus tard, cette page serait mise à jour pour le
          préciser, avec ce qui est collecté et par qui — avant la mise en ligne, pas après.
        </p>

        <h2>Hébergement et journaux serveur</h2>
        <p>
          Le site est servi sous forme de pages statiques par un hébergeur (Netlify). Comme
          pratiquement tout hébergeur web, celui-ci enregistre des journaux de requêtes standards —
          adresse IP, horodatage, page demandée, identifiant du navigateur — pour la livraison et la
          prévention des abus. C’est une conséquence du simple fait d’être sur Internet, pas quelque
          chose que ce site fait de vos données ; nous n’analysons pas ces journaux, et ils ne
          contiennent rien sur les grilles que vous avez générées, puisque vos grilles n’atteignent
          jamais le serveur.
        </p>

        <h2>Polices et requêtes vers des tiers</h2>
        <p>
          Les trois polices utilisées ici sont servies depuis le domaine propre de ce site plutôt que
          depuis Google Fonts, si bien que charger une page ne révèle à aucun fournisseur de polices que
          vous êtes venu. La bibliothèque PDF est elle aussi intégrée au site et chargée depuis notre
          propre domaine. Naviguer sur ce site ne devrait amener votre navigateur à contacter aucun
          tiers.
        </p>

        <h2>Enfants</h2>
        <p>
          Le site convient aux enfants et ne collecte rien auprès de personne, quel que soit son âge. Il
          n’y a aucun contenu généré par les utilisateurs, aucune messagerie et aucun moyen pour un
          visiteur de soumettre des informations.
        </p>

        <h2>Modifications de cette page</h2>
        <p>
          Si la façon dont le site traite les données change — mesure d’audience, service intégré,
          quoi que ce soit — cette page change avec elle. Dernière mise à jour le 4 février 2026.
        </p>
      </div>
    );
  }

  if (locale === 'es') {
    return (
      <div className="prose-press mt-8 max-w-prose">
        <h2>Qué pasa con los sudokus que generas</h2>
        <p>
          Nada sale de tu navegador. Cuando pulsas Generar, JavaScript que se ejecuta en tu propio
          dispositivo construye los sudokus, verifica cada uno con un solucionador y monta el PDF. El
          enlace de descarga apunta a un archivo guardado en la memoria de tu navegador, no en un
          servidor.
        </p>
        <p>
          Como resultado, no queda registro en ningún sitio de lo que has generado — ni tu dificultad,
          ni tu número de sudokus, ni las cuadrículas en sí. No podríamos mostrarte tus tiradas
          anteriores aunque nos lo pidieras, porque nunca fueron nuestras para guardarlas. Al cerrar la
          pestaña, desaparecen.
        </p>

        <h2>Cuentas y datos personales</h2>
        <p>
          No hay cuentas, así que no hay nada que registrar ni ninguna contraseña que guardar. No te
          pedimos tu nombre ni tu correo electrónico, no hay boletín de noticias, y ningún formulario de
          este sitio recopila información personal. No vendemos ni compartimos datos personales, porque
          no tenemos ninguno que vender o compartir.
        </p>

        <h2>Cookies y almacenamiento local</h2>
        <p>
          Este sitio no instala cookies propias ni guarda tus ajustes en el almacenamiento local. Tus
          elecciones de dificultad y diseño existen solo mientras estás en la página y desaparecen
          cuando te vas.
        </p>

        <h2>Analítica</h2>
        <p>
          Este despliegue no incluye ningún script de analítica, ninguna etiqueta publicitaria ni
          rastreadores de terceros. Si más adelante se añadiera analítica, esta página se actualizaría
          para decirlo, junto con qué se recopila y quién lo recopila — antes de publicarlo, no después.
        </p>

        <h2>Alojamiento y registros del servidor</h2>
        <p>
          El sitio se sirve como páginas estáticas desde un proveedor de alojamiento (Netlify). Como
          prácticamente cualquier alojamiento web, el proveedor registra los datos habituales de las
          peticiones — dirección IP, fecha y hora, página solicitada, identificador del navegador — para
          la entrega del contenido y la prevención de abusos. Eso es parte de estar en internet, no algo
          que este sitio haga con tus datos; no analizamos esos registros, y no contienen nada sobre los
          sudokus que has generado, porque tus sudokus nunca llegan al servidor.
        </p>

        <h2>Tipografías y peticiones a terceros</h2>
        <p>
          Las tres tipografías usadas aquí se sirven desde el propio dominio de este sitio en lugar de
          desde Google Fonts, así que cargar una página no le dice a ningún proveedor de fuentes que has
          estado aquí. La librería de PDF también va incluida en el sitio y se carga desde nuestro
          propio dominio. Navegar por este sitio no debería hacer que tu navegador contacte con ningún
          tercero.
        </p>

        <h2>Menores</h2>
        <p>
          El sitio es adecuado para menores y no recopila nada de nadie, sea cual sea su edad. No hay
          contenido generado por usuarios, ni mensajería, ni ninguna forma de que un visitante envíe
          información.
        </p>

        <h2>Cambios en esta página</h2>
        <p>
          Si cambia la forma en que el sitio trata los datos — analítica, un servicio integrado,
          cualquier cosa — esta página cambia con ello. Última actualización el 4 de febrero de 2026.
        </p>
      </div>
    );
  }

  return (
    <div className="prose-press mt-8 max-w-prose">
      <h2>What happens to the puzzles you generate</h2>
      <p>
        Nothing leaves your browser. When you press Generate, JavaScript running on your own
        device builds the puzzles, verifies each one with a solver, and assembles the PDF. The
        download link points at a file held in your browser&rsquo;s memory, not at a server.
      </p>
      <p>
        As a result there is no record anywhere of what you generated — not your difficulty, not
        your puzzle count, not the grids themselves. We could not show you your previous runs if
        you asked, because they were never ours to keep. Closing the tab discards them.
      </p>

      <h2>Accounts and personal data</h2>
      <p>
        There are no accounts, so there is nothing to sign up for and no password to store. We do
        not ask for your name or your email address, there is no newsletter, and there is no form
        on this site that collects personal information. We do not sell or share personal data,
        because we do not have any to sell or share.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        This site sets no cookies of its own and does not write your settings to local storage.
        Your difficulty and layout choices live in the page while you are on it and are gone when
        you leave.
      </p>

      <h2>Analytics</h2>
      <p>
        This deployment ships with no analytics script, no advertising tags and no third-party
        trackers. If analytics are added later, this page will be updated to say so, what is
        collected, and by whom — before it goes live rather than after.
      </p>

      <h2>Hosting and server logs</h2>
      <p>
        The site is served as static pages from a hosting provider (Netlify). Like essentially
        every web host, the provider records standard request logs — IP address, timestamp, the
        page requested, browser user agent — for delivery and abuse prevention. That is a
        function of being on the internet at all rather than something this site does with your
        data, we do not analyse those logs, and they contain nothing about the puzzles you
        generated, because your puzzles never reach the server.
      </p>

      <h2>Fonts and third-party requests</h2>
      <p>
        The three typefaces used here are served from this site&rsquo;s own domain rather than
        from Google Fonts, so loading a page does not tell a font provider that you visited. The
        PDF library is likewise bundled with the site and loaded from our origin. Browsing this
        site should not cause your browser to contact a third party.
      </p>

      <h2>Children</h2>
      <p>
        The site is suitable for children and collects nothing from anyone, of any age. There is
        no user-generated content, no messaging and no way for a visitor to submit information.
      </p>

      <h2>Changes to this page</h2>
      <p>
        If how the site handles data changes — analytics, an embedded service, anything at all —
        this page changes with it. Last updated 4 February 2026.
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
