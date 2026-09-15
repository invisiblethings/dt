import Link from 'next/link';
import { localizedPath, type Locale } from '@/i18n/config';

export function HowToPrintSudokuBody({ locale }: { locale: Locale }) {
  const L = (p: string) => localizedPath(locale, p);

  if (locale === 'de') {
    return (
      <>
        <p>
          Ein gedrucktes Sudoku ist eine bessere Löse-Erfahrung als ein Bildschirm — du siehst jede
          Bleistiftnotiz auf einen Blick, kannst frei kritzeln und es eine Woche auf dem Küchentisch
          liegen lassen. Aber ein schlecht gedrucktes ist schlimmer als beides: Raster zu klein zum
          Beschriften, Blockränder, die sich nicht von den Zellenlinien unterscheiden lassen, oder
          eine am Rand abgeschnittene Seite. Das meiste davon läuft auf vier Einstellungen hinaus.
        </p>

        <h2>Wähle die Seitengröße passend zu deinem Papier, bevor du generierst</h2>
        <p>
          A4 misst 210 × 297 mm; US Letter 216 × 279 mm. Letter ist breiter und kürzer. Der
          Unterschied ist klein, aber ein A4-Layout auf Letter-Papier zu drucken bedeutet, dass der
          Drucker entweder alles verkleinert oder unten abschneidet, und in beiden Fällen verlierst
          du Rastergröße ohne Grund.
        </p>
        <p>
          Wähle das Richtige im Generator statt es im Druckdialog zu korrigieren. Der Generator legt
          die Seite in deiner gewählten Größe mit 16 mm Rand auf allen vier Seiten an, was bequem
          innerhalb des nicht bedruckbaren Rands jedes Heim- und Bürodruckers liegt, den wir kennen,
          sodass danach nichts nachjustiert werden muss.
        </p>

        <h2>Drucke bei 100 %, nicht &bdquo;an Seite anpassen&ldquo;</h2>
        <p>
          Das ist die mit Abstand häufigste Ursache für einen enttäuschenden Ausdruck.
          &bdquo;An Seite anpassen&ldquo;, &bdquo;übergroße Seiten verkleinern&ldquo; und
          &bdquo;auf Passgröße skalieren&ldquo; existieren alle, um Dokumente zu retten, deren Ränder
          zu knapp sind. Das PDF von hier muss nicht gerettet werden, und die Einstellung verkleinert
          das Raster einfach um ein paar Prozent — genug, um es zu bemerken, wenn du drei
          Kandidatenziffern in eine Ecke schreibst.
        </p>
        <p>
          In den meisten Druckdialogen heißt die gewünschte Option <strong>Tatsächliche Größe</strong>{' '}
          oder <strong>100 %</strong>, und es lohnt sich, das jedes Mal zu prüfen: manche Treiber
          setzen sich von selbst auf &bdquo;an Seite anpassen&ldquo; zurück.
        </p>

        <h2>Wähle die Rätsel pro Seite nach deiner Lösungsweise</h2>
        <p>
          Das Layout bestimmt deine Rastergröße, und die Rastergröße entscheidet, ob das Rätsel
          bequem ist. Auf A4 mit Standardrändern ergibt ein Rätsel pro Seite ein Raster von rund
          17 cm, zwei etwa 12 cm, vier etwa 8 cm und sechs etwa 6,5 cm.
        </p>
        <p>
          Löst du ohne Kandidatennotizen, ist sechs pro Seite in Ordnung und spart viel Papier.
          Trägst du Kandidaten mit Bleistift ein — was alles oberhalb von mittelschwer erfordert —
          brauchst du Felder von etwa 12 mm, um drei kleine Ziffern leserlich zu schreiben, und das
          bedeutet zwei pro Seite. Für <Link href={L('/printable-sudoku/expert')}>Experten-Raster</Link>
          , bei denen nahezu jedes leere Feld markiert wird, ist eins pro Seite nicht übertrieben.
        </p>
        <p>
          Eine vernünftige Vorgabe: einfach und mittelschwer mit{' '}
          <Link href={L('/printable-sudoku-4-per-page')}>vier pro Seite</Link>, schwer mit zwei,
          Experte mit einem.
        </p>

        <h2>Halte den Lösungsschlüssel getrennt</h2>
        <p>
          Druckst du für jemand anderen als dich selbst, spielt die Platzierung der Lösungen eine
          Rolle. Das generierte PDF stellt den gesamten Lösungsschlüssel in einen eigenen Abschnitt
          nach den Rätseln, nie auf demselben Blatt wie das Rätsel, das er löst, sodass du die
          vordere Hälfte austeilen und die hintere behalten kannst. Jede Lösung trägt denselben
          sechsstelligen Code wie ihr Rätsel, sodass die Seiten aufgeteilt und später wieder
          zugeordnet werden können — und derselbe Code ruft die Lösung auf der{' '}
          <Link href={L('/sudoku-answers')}>Seite zum Lösungs-Nachschlagen</Link> ab, falls der
          Schlüssel jemals verlorengeht.
        </p>
        <p>
          Möchtest du gar keine Lösungen, entferne das Häkchen vor dem Generieren — oder drucke
          einfach die erste Hälfte des Dokuments, da der Schlüssel immer zuletzt kommt. Mehr dazu,
          wie das funktioniert, steht auf der Seite{' '}
          <Link href={L('/printable-sudoku-with-answers')}>Sudoku zum Ausdrucken mit Lösungen</Link>.
        </p>

        <h2>Papier und Tinte</h2>
        <p>
          Gewöhnliches 80-g/m²-Kopierpapier ist völlig ausreichend und das, was die meisten
          verwenden werden. Schreibst du mit kräftigem Bleistiftdruck oder radierst du viel, hält
          90 bis 100 g/m² merklich besser — Radieren auf dünnem Papier hinterlässt einen grauen
          Schmier, der Kandidatennotizen schwer lesbar macht.
        </p>
        <p>
          Drucke in Schwarz-Weiß, im Entwurfs- oder Sparmodus. Die Raster sind reine Strichzeichnungen
          ohne Schattierung, sodass Entwurfsqualität optisch nichts kostet und deinen Tintenverbrauch
          etwa halbiert. Verwende keine Farb- oder Fotoeinstellung; sie ist langsamer und das Ergebnis
          identisch.
        </p>
        <p>
          Noch etwas, das sich bei einem Drucker lohnt, den du dafür noch nicht benutzt hast: Drucke
          zuerst eine einzelne Seite und sieh sie dir an. Prüfe, ob sich die Blockränder deutlich
          schwerer lesen als die Zellenlinien, prüfe, ob die Ziffern scharf sind, und prüfe, dass
          nichts abgeschnitten ist. Dann schick die restlichen neunzehn Seiten los.
        </p>

        <h2>Drucken für eine Gruppe</h2>
        <p>
          Für ein Klassenzimmer, ein Pflegeheim oder eine lange Reise generiere einen Durchgang statt
          mehrerer. Ein Satz von 24 Rätseln zu vier pro Seite sind sechs Blätter, oder drei beidseitig
          bedruckte, plus dasselbe noch einmal für den Schlüssel. Gemischte Schwierigkeit lohnt sich
          hier zu überlegen — die Einstellung <strong>gemischt</strong> des Generators zieht für jedes
          Rätsel im Durchgang eine zufällige Stufe, was einen Raum mit unterschiedlichen Fähigkeiten
          ungefähr im gleichen Tempo hält, statt die Hälfte ins Stocken geraten zu lassen.
        </p>
        <p>
          Da die Rätsel jedes Mal frisch generiert und nicht aus einer festen Bibliothek gezogen
          werden, bekommen zwei Personen, die am selben Tag drucken, nicht dieselben Raster — du
          kannst also einen zweiten Satz für eine zweite Gruppe drucken, ohne dass jemand ihn
          wiedererkennt. <Link href={L('/')}>Leg deinen Durchgang fest</Link> und drucke ihn.
        </p>
      </>
    );
  }

  if (locale === 'fr') {
    return (
      <>
        <p>
          Un sudoku imprimé offre une meilleure expérience de résolution qu&rsquo;un écran — vous
          voyez toutes les annotations d&rsquo;un coup d&rsquo;œil, vous griffonnez librement, et
          vous pouvez le laisser sur la table de la cuisine pendant une semaine. Mais un mauvais
          tirage est pire que les deux : des grilles trop petites pour être annotées, des bordures de
          bloc impossibles à distinguer des lignes de case, ou une page rognée sur le bord. Tout cela
          tient généralement à quatre réglages.
        </p>

        <h2>Adaptez le format de page à votre papier avant de générer</h2>
        <p>
          L&rsquo;A4 mesure 210 × 297 mm ; le US Letter, 216 × 279 mm. Le Letter est plus large et
          plus court. C&rsquo;est une petite différence, mais imprimer une mise en page A4 sur du
          papier Letter oblige l&rsquo;imprimante soit à tout réduire, soit à rogner le bas, et dans
          les deux cas vous perdez de la taille de grille pour rien.
        </p>
        <p>
          Choisissez le bon format dans le générateur plutôt que de le corriger dans la boîte de
          dialogue d&rsquo;impression. Le générateur met la page en forme à la taille choisie avec
          des marges de 16 mm sur les quatre côtés, ce qui reste confortablement à l&rsquo;intérieur
          de la zone non imprimable de toutes les imprimantes domestiques et de bureau que nous
          connaissons, si bien que rien n&rsquo;a besoin d&rsquo;être ajusté ensuite.
        </p>

        <h2>Imprimez à 100 %, pas en &laquo; ajuster à la page &raquo;</h2>
        <p>
          C&rsquo;est la cause la plus fréquente, de loin, d&rsquo;une impression décevante.
          &laquo; Ajuster à la page &raquo;, &laquo; réduire les pages trop grandes &raquo; et
          &laquo; mettre à l&rsquo;échelle &raquo; existent toutes pour sauver des documents dont les
          marges sont trop serrées. Le PDF fourni ici n&rsquo;a pas besoin d&rsquo;être sauvé, et ce
          réglage se contente de réduire la grille de quelques pour cent — assez pour se remarquer
          quand vous écrivez trois chiffres candidats dans un coin.
        </p>
        <p>
          Dans la plupart des boîtes de dialogue d&rsquo;impression, l&rsquo;option à choisir est{' '}
          <strong>Taille réelle</strong> ou <strong>100 %</strong>, et cela vaut la peine de vérifier
          à chaque fois : certains pilotes reviennent d&rsquo;eux-mêmes à l&rsquo;ajustement à la
          page.
        </p>

        <h2>Choisissez le nombre de grilles par page selon votre façon de résoudre</h2>
        <p>
          La mise en page détermine la taille de la grille, et la taille de la grille détermine si le
          sudoku est confortable à résoudre. Sur A4 avec des marges standards, une grille par page
          donne environ 17 cm de côté, deux environ 12 cm, quatre environ 8 cm et six environ 6,5 cm.
        </p>
        <p>
          Si vous résolvez sans annotations de candidats, six par page conviennent très bien et
          économisent beaucoup de papier. Si vous notez les candidats au crayon — ce qu&rsquo;exige
          tout niveau au-dessus de moyen — il vous faut des cases d&rsquo;environ 12 mm pour écrire
          trois petits chiffres lisiblement, ce qui impose deux par page. Pour les{' '}
          <Link href={L('/printable-sudoku/expert')}>grilles expert</Link>, où presque toutes les
          cases vides finissent annotées, une par page n&rsquo;est pas un luxe superflu.
        </p>
        <p>
          Un réglage par défaut raisonnable : facile et moyen à{' '}
          <Link href={L('/printable-sudoku-4-per-page')}>quatre par page</Link>, difficile à deux,
          expert à une.
        </p>

        <h2>Séparez le corrigé</h2>
        <p>
          Si vous imprimez pour quelqu&rsquo;un d&rsquo;autre que vous-même, l&rsquo;emplacement des
          réponses compte. Le PDF généré place l&rsquo;intégralité du corrigé dans sa propre section
          après les grilles, jamais sur la même feuille que la grille qu&rsquo;il résout, afin que
          vous puissiez distribuer la première moitié et garder la seconde. Chaque solution porte le
          même code à six caractères que sa grille, si bien que les pages peuvent être séparées puis
          réassociées plus tard — et ce même code permet de retrouver la solution sur la{' '}
          <Link href={L('/sudoku-answers')}>page de recherche de corrigés</Link> si jamais le corrigé
          venait à manquer.
        </p>
        <p>
          Si vous préférez ne pas avoir de corrigé du tout, décochez l&rsquo;option avant de générer
          — ou imprimez simplement la première moitié du document, puisque le corrigé arrive toujours
          en dernier. Il y a plus d&rsquo;informations sur son fonctionnement sur la page{' '}
          <Link href={L('/printable-sudoku-with-answers')}>sudoku à imprimer avec corrigé</Link>.
        </p>

        <h2>Papier et encre</h2>
        <p>
          Le papier copieur ordinaire de 80 g/m² convient très bien et c&rsquo;est ce que la plupart
          des gens utiliseront. Si vous appuyez fort au crayon ou si vous gommez beaucoup, un papier
          de 90 à 100 g/m² tient nettement mieux — gommer sur du papier fin laisse une trace grise
          qui rend les annotations de candidats difficiles à lire.
        </p>
        <p>
          Imprimez en noir et blanc, en mode brouillon ou économique. Les grilles ne sont que des
          traits, sans aplat, donc la qualité brouillon ne coûte rien visuellement et divise à peu
          près par deux votre consommation d&rsquo;encre. N&rsquo;utilisez pas de réglage couleur ou
          photo ; c&rsquo;est plus lent et le résultat est identique.
        </p>
        <p>
          Une dernière chose utile sur une imprimante que vous n&rsquo;avez pas encore utilisée pour
          cela : imprimez d&rsquo;abord une seule page et regardez-la. Vérifiez que les bordures de
          bloc se lisent plus épaisses que les lignes de case, vérifiez que les chiffres sont nets, et
          vérifiez que rien n&rsquo;est rogné. Puis envoyez les dix-neuf pages restantes.
        </p>

        <h2>Imprimer pour un groupe</h2>
        <p>
          Pour une classe, un établissement pour personnes âgées ou un long trajet, générez un seul
          lot plutôt que plusieurs. Une série de 24 grilles à quatre par page fait six feuilles, ou
          trois en recto verso, plus autant pour le corrigé. La difficulté mixte mérite
          d&rsquo;être envisagée ici — le réglage <strong>mixte</strong> du générateur tire un niveau
          aléatoire pour chaque grille du lot, ce qui permet à une salle aux niveaux variés
          d&rsquo;avancer à peu près au même rythme au lieu de laisser la moitié bloquée.
        </p>
        <p>
          Comme les grilles sont générées à la volée plutôt que puisées dans une bibliothèque fixe,
          deux personnes qui impriment le même jour n&rsquo;obtiendront pas les mêmes grilles — vous
          pouvez donc imprimer un second lot pour un second groupe sans que personne ne le
          reconnaisse. <Link href={L('/')}>Définissez votre lot</Link> et imprimez-le.
        </p>
      </>
    );
  }

  if (locale === 'es') {
    return (
      <>
        <p>
          Un sudoku impreso ofrece una mejor experiencia de resolución que una pantalla — ves todas
          las anotaciones a lápiz de un vistazo, puedes garabatear con libertad y dejarlo en la mesa
          de la cocina durante una semana. Pero uno mal impreso es peor que ambas cosas: cuadrículas
          demasiado pequeñas para anotar, bordes de región que no se distinguen de las líneas de las
          casillas, o una página recortada por el borde. La mayor parte de eso se reduce a cuatro
          ajustes.
        </p>

        <h2>Ajusta el tamaño de página a tu papel antes de generar</h2>
        <p>
          El A4 mide 210 × 297 mm; el US Letter, 216 × 279 mm. El Letter es más ancho y más corto. Es
          una diferencia pequeña, pero imprimir un diseño en A4 sobre papel Letter hace que la
          impresora reduzca todo o recorte la parte inferior, y en ambos casos pierdes tamaño de
          cuadrícula sin motivo.
        </p>
        <p>
          Elige el tamaño correcto en el generador en lugar de corregirlo en el cuadro de diálogo de
          impresión. El generador compone la página al tamaño elegido con márgenes de 16 mm en los
          cuatro lados, lo que queda cómodamente dentro del área no imprimible de cualquier impresora
          doméstica o de oficina que conozcamos, así que no hace falta ajustar nada después.
        </p>

        <h2>Imprime al 100 %, no &laquo;ajustar a la página&raquo;</h2>
        <p>
          Esta es, con diferencia, la causa más habitual de una impresión decepcionante. &laquo;Ajustar
          a la página&raquo;, &laquo;reducir páginas grandes&raquo; y &laquo;escalar para
          ajustar&raquo; existen todas para rescatar documentos con márgenes demasiado ajustados. El
          PDF de aquí no necesita rescate, y ese ajuste simplemente encoge la cuadrícula unos puntos
          porcentuales — lo suficiente para notarlo cuando escribes tres números candidatos en una
          esquina.
        </p>
        <p>
          En la mayoría de los cuadros de diálogo de impresión, la opción que quieres es{' '}
          <strong>Tamaño real</strong> o <strong>100 %</strong>, y merece la pena comprobarlo cada
          vez: algunos controladores vuelven por su cuenta a ajustar a la página.
        </p>

        <h2>Elige los sudokus por página según cómo resuelves</h2>
        <p>
          El diseño determina el tamaño de la cuadrícula, y el tamaño de la cuadrícula determina si el
          sudoku resulta cómodo. En A4 con márgenes estándar, un sudoku por página da una cuadrícula
          de unos 17 cm, dos da unos 12 cm, cuatro unos 8 cm y seis unos 6,5 cm.
        </p>
        <p>
          Si resuelves sin anotar candidatos, seis por página está bien y ahorra mucho papel. Si
          anotas candidatos a lápiz — algo que cualquier nivel por encima de medio va a requerir —
          necesitas casillas de unos 12 mm para escribir tres cifras pequeñas con legibilidad, y eso
          significa dos por página. Para las{' '}
          <Link href={L('/printable-sudoku/expert')}>cuadrículas expertas</Link>, donde casi todas las
          casillas vacías acaban anotadas, una por página no es un derroche.
        </p>
        <p>
          Un valor por defecto razonable: fácil y medio a{' '}
          <Link href={L('/printable-sudoku-4-per-page')}>cuatro por página</Link>, difícil a dos,
          experto a una.
        </p>

        <h2>Mantén las soluciones aparte</h2>
        <p>
          Si imprimes para alguien que no seas tú, la colocación de las soluciones importa. El PDF
          generado pone todas las soluciones en su propia sección después de los sudokus, nunca en la
          misma hoja que el sudoku que resuelve, para que puedas repartir la primera mitad y quedarte
          con la segunda. Cada solución lleva el mismo código de seis caracteres que su sudoku, así
          que las páginas se pueden separar y luego volver a emparejar — y ese mismo código recupera
          la solución en la <Link href={L('/sudoku-answers')}>página de búsqueda de soluciones</Link>{' '}
          si el documento con las soluciones llegara a perderse.
        </p>
        <p>
          Si prefieres no tener soluciones en absoluto, desmarca la opción antes de generar — o
          simplemente imprime la primera mitad del documento, ya que las soluciones siempre van al
          final. Hay más información sobre cómo funciona en la página de{' '}
          <Link href={L('/printable-sudoku-with-answers')}>sudoku para imprimir con soluciones</Link>.
        </p>

        <h2>Papel y tinta</h2>
        <p>
          El papel de fotocopiadora normal de 80 g/m² va bien y es lo que usará la mayoría de la
          gente. Si escribes con el lápiz muy apretado o borras mucho, uno de 90 a 100 g/m² aguanta
          notablemente mejor — borrar sobre papel fino deja una mancha gris que hace difícil leer las
          anotaciones de candidatos.
        </p>
        <p>
          Imprime en blanco y negro, en modo borrador o económico. Las cuadrículas son solo líneas,
          sin sombreados, así que la calidad borrador no cuesta nada visualmente y aproximadamente
          reduce a la mitad el consumo de tinta. No uses un ajuste de color o de foto; es más lento y
          el resultado es idéntico.
        </p>
        <p>
          Una última cosa que merece la pena hacer en una impresora que no hayas usado antes para
          esto: imprime primero una sola página y míralo. Comprueba que los bordes de las regiones se
          leen más gruesos que las líneas de las casillas, comprueba que los números salen nítidos y
          comprueba que nada queda recortado. Luego envía las otras diecinueve páginas.
        </p>

        <h2>Imprimir para un grupo</h2>
        <p>
          Para un aula, una residencia o un viaje largo, genera un solo lote en vez de varios. Una
          tanda de 24 sudokus a cuatro por página son seis hojas, o tres a doble cara, más lo mismo
          otra vez para las soluciones. Aquí merece la pena considerar la dificultad mixta — el
          ajuste <strong>mixto</strong> del generador saca un nivel aleatorio para cada sudoku del
          lote, lo que mantiene a un grupo de niveles distintos avanzando a un ritmo parecido en vez
          de dejar a la mitad atascada.
        </p>
        <p>
          Como los sudokus se generan de nuevo cada vez en lugar de sacarse de una biblioteca fija,
          dos personas que impriman el mismo día no obtendrán las mismas cuadrículas — así que puedes
          imprimir un segundo lote para un segundo grupo sin que nadie lo reconozca.{' '}
          <Link href={L('/')}>Define tu tanda</Link> e imprímela.
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        A printed sudoku is a better solving experience than a screen — you can see every pencil
        mark at once, scribble freely, and leave it on the kitchen table for a week. But a badly
        printed one is worse than either: grids too small to annotate, box borders you cannot pick
        out from the cell lines, or a page clipped at the edge. Most of that comes down to four
        settings.
      </p>

      <h2>Match the page size to your paper, before you generate</h2>
      <p>
        A4 is 210 × 297 mm; US Letter is 216 × 279 mm. Letter is wider and shorter. It is a small
        difference, but printing an A4 layout onto Letter paper means the printer either scales
        everything down or crops the bottom, and in both cases you lose grid size for no reason.
      </p>
      <p>
        Pick the right one in the generator rather than fixing it in the print dialog. The
        generator lays the page out at your chosen size with 16 mm margins on all four sides, which sits
        comfortably inside the non-printable edge of every home and office printer we know of, so
        nothing needs adjusting afterwards.
      </p>

      <h2>Print at 100%, not &ldquo;fit to page&rdquo;</h2>
      <p>
        This is the single most common cause of a disappointing print. &ldquo;Fit to page&rdquo;,
        &ldquo;shrink oversized pages&rdquo; and &ldquo;scale to fit&rdquo; all exist to rescue
        documents whose margins are too tight. The PDF from here does not need rescuing, and the
        setting simply shrinks the grid by a few percent — enough to notice when you are writing
        three candidate digits into a corner.
      </p>
      <p>
        In most print dialogs the option you want is <strong>Actual size</strong> or{' '}
        <strong>100%</strong>, and it is worth checking every time: some drivers reset to fit-to-page
        on their own.
      </p>

      <h2>Choose puzzles per page for how you solve</h2>
      <p>
        The layout decides your grid size, and grid size decides whether the puzzle is comfortable.
        On A4 with standard margins, one puzzle per page gives roughly a 17 cm grid, two gives about
        12 cm, four about 8 cm and six about 6.5 cm.
      </p>
      <p>
        If you solve without candidate marks, six per page is fine and saves a lot of paper. If you
        pencil in candidates — which anything above medium will require — you need cells of about 12
        mm to write three small digits legibly, and that means two per page. For{' '}
        <Link href={L('/printable-sudoku/expert')}>expert grids</Link>, where nearly every empty cell ends
        up marked, one per page is not extravagant.
      </p>
      <p>
        A reasonable default: easy and medium at{' '}
        <Link href={L('/printable-sudoku-4-per-page')}>four per page</Link>, hard at two, expert at
        one.
      </p>

      <h2>Keep the answer key separate</h2>
      <p>
        If you are printing for anyone other than yourself, the placement of the answers matters.
        The generated PDF puts the whole answer key in its own section after the puzzles, never on
        the same sheet as the puzzle it solves, so you can hand out the front half and keep the back. Each
        solution carries the same six-character code as its puzzle, so the pages can be split up
        and still matched later — and that same code will fetch the answer on the{' '}
        <Link href={L('/sudoku-answers')}>answer lookup page</Link> if the key ever goes missing.
      </p>
      <p>
        If you would rather not have the answers at all, untick the option before generating — or
        just print the first half of the document, since the key always comes last. There is more on
        how it works on the{' '}
        <Link href={L('/printable-sudoku-with-answers')}>printable sudoku with answers</Link> page.
      </p>

      <h2>Paper and ink</h2>
      <p>
        Ordinary 80 gsm copier paper is fine and is what most people will use. If you write hard
        with a pencil or plan to erase a lot, 90 to 100 gsm holds up noticeably better — erasing on
        thin paper leaves a grey smear that makes candidate marks hard to read.
      </p>
      <p>
        Print in black and white, in draft or economy mode. The grids are pure line work with no
        shading, so draft quality costs you nothing visually and roughly halves your ink use. Do not
        use a colour or photo setting; it is slower and the result is identical.
      </p>
      <p>
        One more thing worth doing on a printer you have not used for this before: print a single
        page first and look at it. Check the box borders read as heavier than the cell lines, check
        the digits are crisp, and check nothing is clipped. Then send the other nineteen pages.
      </p>

      <h2>Printing for a group</h2>
      <p>
        For a classroom, a care home or a long journey, generate one batch rather than several. A
        run of 24 puzzles at four per page is six sheets, or three double-sided, plus the same again
        for the key. Mixed difficulty is worth considering here — the generator&rsquo;s{' '}
        <strong>mixed</strong> setting draws a random level for each puzzle in the run, which keeps a
        room of different abilities moving at roughly the same pace instead of leaving half of them
        stalled.
      </p>
      <p>
        Because the puzzles are generated fresh each time rather than pulled from a fixed library,
        two people printing on the same day will not get the same grids — so you can run off a
        second set for a second group without anyone recognising it.{' '}
        <Link href={L('/')}>Set your run</Link> and print it.
      </p>
    </>
  );
}
