import Link from 'next/link';
import { localizedPath, type Locale } from '@/i18n/config';

export function HowToPrintSudokuBody({ locale }: { locale: Locale }) {
  const L = (p: string) => localizedPath(locale, p);

  if (locale === 'de') {
    return (
      <>
        <p>
          Ein gedrucktes Sudoku schlägt den Bildschirm: Du siehst alle Bleistiftnotizen auf einen
          Blick, kannst frei kritzeln und das Blatt eine Woche auf dem Küchentisch liegen lassen.
          Ein schlechter Ausdruck verspielt diese Vorteile, mit Rastern, die zu klein zum
          Beschriften sind, Blockrändern, die sich nicht von den Zellenlinien abheben, oder einer am
          Rand abgeschnittenen Seite. Vier Einstellungen beheben das meiste davon.
        </p>

        <h2>Wähle die Seitengröße passend zu deinem Papier, bevor du generierst</h2>
        <p>
          A4 misst 210 × 297 mm und US Letter 216 × 279 mm, Letter ist also breiter und kürzer. Der
          Unterschied ist klein, aber druckst du ein A4-Layout auf Letter-Papier, verkleinert der
          Drucker entweder alles oder schneidet unten ab, und in beiden Fällen verlierst du
          Rastergröße.
        </p>
        <p>
          Wähle die richtige Größe im Generator, statt sie im Druckdialog zu korrigieren. Der
          Generator legt die Seite in deiner gewählten Größe mit 16 mm Rand auf allen vier Seiten
          an, innerhalb des bedruckbaren Bereichs gängiger Heim- und Bürodrucker, sodass du danach
          nichts anpassen musst.
        </p>

        <h2>Drucke bei 100 % statt mit &bdquo;An Seite anpassen&ldquo;</h2>
        <p>
          Die Skalierung verdirbt mehr Ausdrucke als jede andere Einstellung. &bdquo;An Seite
          anpassen&ldquo;, &bdquo;Übergroße Seiten verkleinern&ldquo; und &bdquo;Auf Passgröße
          skalieren&ldquo; sollen Dokumente retten, deren Ränder zu knapp sind. Das PDF dieser
          Website hat genug Platz, also verkleinert die Einstellung das Raster ohne Grund um ein
          paar Prozent, und du merkst den Verlust, wenn du drei Kandidatenziffern in eine Ecke
          schreibst.
        </p>
        <p>
          In den meisten Druckdialogen heißt die gewünschte Option <strong>Tatsächliche
          Größe</strong> oder <strong>100 %</strong>. Prüf sie jedes Mal, denn manche Druckertreiber
          stellen sich von selbst auf &bdquo;An Seite anpassen&ldquo; zurück.
        </p>

        <h2>Wähle die Rätsel pro Seite nach deiner Lösungsweise</h2>
        <p>
          Das Layout bestimmt deine Rastergröße, und die Rastergröße entscheidet, wie bequem das
          Rätsel ist. Auf A4 mit Standardrändern ergibt ein Rätsel pro Seite ein Raster von etwa 17
          cm, zwei etwa 12 cm, vier etwa 8 cm und sechs etwa 6,5 cm.
        </p>
        <p>
          Löst du ohne Kandidatennotizen, funktionieren sechs pro Seite und sparen viel Papier.
          Trägst du Kandidaten mit Bleistift ein, was du oberhalb von mittel brauchst, benötigst
          du Felder von etwa 12 mm, um drei kleine Ziffern leserlich zu schreiben, und das
          bedeutet zwei pro Seite. Für{' '}
          <Link href={L('/printable-sudoku/expert')}>Experten-Raster</Link>, bei denen du fast
          jedes leere Feld markierst, lohnt sich eines pro Seite.
        </p>
        <p>
          Eine vernünftige Vorgabe: einfach und mittel mit{' '}
          <Link href={L('/printable-sudoku-4-per-page')}>vier pro Seite</Link>, schwer mit zwei,
          Experte mit einem.
        </p>

        <h2>Halte den Lösungsschlüssel getrennt</h2>
        <p>
          Druckst du für andere, spielt die Platzierung der Lösungen eine Rolle. Das PDF stellt
          den gesamten Lösungsschlüssel in einen eigenen Abschnitt nach den Rätseln, auf getrennte
          Blätter, sodass du die vordere Hälfte austeilen und die hintere behalten kannst. Jede
          Lösung trägt denselben sechsstelligen Code wie ihr Rätsel, sodass du die Seiten
          aufteilen und später wieder zuordnen kannst. Geht der Schlüssel verloren, ruft derselbe
          Code die Lösung auf der{' '}
          <Link href={L('/sudoku-answers')}>Seite zum Lösungs-Nachschlagen</Link> ab.
        </p>
        <p>
          Um die Lösungen wegzulassen, entferne vor dem Generieren das Häkchen, oder drucke nur
          die erste Hälfte des Dokuments, da der Schlüssel zuletzt kommt. Die Seite{' '}
          <Link href={L('/printable-sudoku-with-answers')}>Sudoku zum Ausdrucken mit Lösungen</Link>{' '}
          erklärt den Schlüssel genauer.
        </p>

        <h2>Papier und Tinte</h2>
        <p>
          Gewöhnliches 80-g/m²-Kopierpapier funktioniert, und die meisten verwenden es. Drückst du
          mit dem Bleistift fest auf oder radierst du viel, hält Papier mit 90 bis 100 g/m² besser,
          denn Radieren auf dünnem Papier hinterlässt einen grauen Schmier, der Kandidatennotizen
          schwer lesbar macht.
        </p>
        <p>
          Drucke in Schwarz-Weiß, im Entwurfs- oder Sparmodus. Die Raster sind reine
          Strichzeichnungen ohne Schattierung, also sieht Entwurfsqualität gleich aus und verbraucht
          etwa die Hälfte der Tinte. Lass Farb- und Fotoeinstellungen weg; sie drucken langsamer und
          liefern dasselbe Ergebnis.
        </p>
        <p>
          Auf einem Drucker, den du noch nicht für Sudoku benutzt hast, drucke zuerst eine einzelne
          Seite. Prüfe, ob die Blockränder schwerer wirken als die Zellenlinien, ob die Ziffern
          scharf sind und ob nichts abgeschnitten ist. Dann schick die restlichen neunzehn Seiten
          los.
        </p>

        <h2>Drucken für eine Gruppe</h2>
        <p>
          Für ein Klassenzimmer, ein Pflegeheim oder eine lange Reise generiere einen Durchgang
          statt mehrerer. Ein Satz von 24 Rätseln mit vier pro Seite füllt sechs Blätter, oder drei
          beidseitig, plus noch einmal so viele für den Schlüssel. Überleg, Schwierigkeiten zu
          mischen: Hake mehr als eine Stufe an, und der Generator verteilt die Auflage gleichmäßig
          darauf, die leichtesten zuerst. Ein gemischter Satz hält einen Raum mit unterschiedlichem
          Können ungefähr im gleichen Tempo.
        </p>
        <p>
          Der Generator erzeugt bei jeder Auflage frische Rätsel, statt sie aus einer festen
          Bibliothek zu ziehen, sodass zwei Personen, die am selben Tag drucken, unterschiedliche
          Raster bekommen und du einen zweiten Satz für eine zweite Gruppe drucken kannst, ohne
          dass ihn jemand wiedererkennt. <Link href={L('/')}>Leg deinen Durchgang fest</Link> und
          drucke ihn.
        </p>
      </>
    );
  }

  if (locale === 'fr') {
    return (
      <>
        <p>
          Un sudoku imprimé vaut mieux qu’un écran : vous voyez toutes vos annotations d’un coup
          d’œil, vous griffonnez librement et vous pouvez laisser la feuille une semaine sur la
          table de la cuisine. Un mauvais tirage perd ces avantages, avec des grilles trop petites
          pour être annotées, des bordures de bloc impossibles à distinguer des lignes de case, ou
          une page rognée sur le bord. Quatre réglages corrigent l’essentiel.
        </p>

        <h2>Adaptez le format de page à votre papier avant de générer</h2>
        <p>
          L’A4 mesure 210 × 297 mm et le US Letter 216 × 279 mm : le Letter est donc plus large et
          plus court. La différence est faible, mais si vous imprimez une mise en page A4 sur du
          papier Letter, l’imprimante réduit tout ou rogne le bas, et dans les deux cas vous perdez
          de la taille de grille.
        </p>
        <p>
          Choisissez le bon format dans le générateur au lieu de le corriger dans la boîte de
          dialogue d’impression. Le générateur met la page en forme à la taille choisie avec des
          marges de 16 mm sur les quatre côtés, dans la zone imprimable des imprimantes domestiques
          et de bureau courantes : vous n’avez rien à ajuster ensuite.
        </p>

        <h2>Imprimez à 100 % au lieu d’&laquo; ajuster à la page &raquo;</h2>
        <p>
          La mise à l’échelle gâche plus d’impressions que tout autre réglage. &laquo; Ajuster à la
          page &raquo;, &laquo; réduire les pages trop grandes &raquo; et &laquo; mettre à l’échelle
          &raquo; servent à sauver des documents dont les marges sont trop serrées. Le PDF de ce
          site a de la marge, donc ce réglage réduit la grille de quelques pour cent pour rien, et
          vous le remarquez en écrivant trois chiffres candidats dans un coin.
        </p>
        <p>
          Dans la plupart des boîtes de dialogue d’impression, l’option à choisir est <strong>Taille
          réelle</strong> ou <strong>100 %</strong>. Vérifiez-la à chaque fois, car certains pilotes
          reviennent d’eux-mêmes à l’ajustement à la page.
        </p>

        <h2>Choisissez le nombre de grilles par page selon votre façon de résoudre</h2>
        <p>
          La mise en page fixe la taille de la grille, et la taille de la grille décide du confort
          de résolution. Sur A4 avec des marges standards, une grille par page donne environ 17 cm
          de côté, deux environ 12 cm, quatre environ 8 cm et six environ 6,5 cm.
        </p>
        <p>
          Si vous résolvez sans annoter les candidats, six par page conviennent et économisent
          beaucoup de papier. Si vous notez les candidats au crayon, ce qu’il vous faudra
          au-dessus du niveau moyen, il vous faut des cases d’environ 12 mm pour écrire trois
          petits chiffres lisiblement, soit deux par page. Pour les{' '}
          <Link href={L('/printable-sudoku/expert')}>grilles expert</Link>, où vous finirez par
          annoter presque toutes les cases vides, une par page vaut le papier.
        </p>
        <p>
          Un réglage par défaut raisonnable : facile et moyen à{' '}
          <Link href={L('/printable-sudoku-4-per-page')}>quatre par page</Link>, difficile à deux,
          expert à une.
        </p>

        <h2>Séparez le corrigé</h2>
        <p>
          Si vous imprimez pour d’autres personnes, l’emplacement des réponses compte. Le PDF
          place tout le corrigé dans sa propre section après les grilles, sur des feuilles
          séparées, afin que vous puissiez distribuer la première moitié et garder la seconde.
          Chaque solution porte le même code à six caractères que sa grille : vous pouvez séparer
          les pages et les réassocier plus tard. Si le corrigé disparaît, le même code retrouve la
          solution sur la <Link href={L('/sudoku-answers')}>page de recherche de corrigés</Link>.
        </p>
        <p>
          Pour vous passer des solutions, décochez l’option avant de générer, ou n’imprimez que la
          première moitié du document, puisque le corrigé arrive en dernier. La page{' '}
          <Link href={L('/printable-sudoku-with-answers')}>sudoku à imprimer avec corrigé</Link>{' '}
          détaille le fonctionnement du corrigé.
        </p>

        <h2>Papier et encre</h2>
        <p>
          Le papier copieur ordinaire de 80 g/m² convient, et c’est celui que la plupart des gens
          utilisent. Si vous appuyez fort au crayon ou gommez beaucoup, un papier de 90 à 100 g/m²
          tient mieux, car gommer sur du papier fin laisse une trace grise qui rend les annotations
          difficiles à lire.
        </p>
        <p>
          Imprimez en noir et blanc, en mode brouillon ou économique. Les grilles ne sont que des
          traits, sans aplat : la qualité brouillon donne le même rendu avec environ moitié moins
          d’encre. Évitez les réglages couleur ou photo, qui impriment plus lentement pour le même
          résultat.
        </p>
        <p>
          Sur une imprimante que vous n’avez pas encore utilisée pour du sudoku, imprimez d’abord
          une seule page. Vérifiez que les bordures de bloc paraissent plus épaisses que les lignes
          de case, que les chiffres sont nets et que rien n’est rogné. Puis envoyez les dix-neuf
          pages restantes.
        </p>

        <h2>Imprimer pour un groupe</h2>
        <p>
          Pour une classe, un établissement pour personnes âgées ou un long trajet, générez un seul
          lot plutôt que plusieurs. Une série de 24 grilles à quatre par page remplit six feuilles,
          ou trois en recto verso, plus autant pour le corrigé. Pensez à mélanger les difficultés :
          cochez plusieurs niveaux, et le générateur répartit le tirage équitablement entre eux, du
          plus facile au plus difficile. Un lot mixte fait avancer une salle aux niveaux variés à
          peu près au même rythme.
        </p>
        <p>
          Le générateur crée de nouvelles grilles à chaque tirage au lieu de les puiser dans une
          bibliothèque fixe : deux personnes qui impriment le même jour obtiennent des grilles
          différentes, et vous pouvez imprimer un second lot pour un second groupe sans que
          personne ne le reconnaisse. <Link href={L('/')}>Définissez votre lot</Link> et
          imprimez-le.
        </p>
      </>
    );
  }

  if (locale === 'es') {
    return (
      <>
        <p>
          Un sudoku impreso gana a una pantalla: ves todas tus anotaciones a lápiz de un vistazo,
          garabateas con libertad y puedes dejar la hoja una semana en la mesa de la cocina. Una
          mala impresión pierde esas ventajas, con cuadrículas demasiado pequeñas para anotar,
          bordes de región que no se distinguen de las líneas de las casillas, o una página
          recortada por el borde. Cuatro ajustes resuelven casi todo eso.
        </p>

        <h2>Ajusta el tamaño de página a tu papel antes de generar</h2>
        <p>
          El A4 mide 210 × 297 mm y el US Letter 216 × 279 mm, así que el Letter es más ancho y más
          corto. La diferencia es pequeña, pero si imprimes un diseño A4 en papel Letter, la
          impresora reduce todo o recorta la parte inferior, y en ambos casos pierdes tamaño de
          cuadrícula.
        </p>
        <p>
          Elige el tamaño correcto en el generador en lugar de corregirlo en el cuadro de impresión.
          El generador compone la página al tamaño elegido con márgenes de 16 mm en los cuatro
          lados, dentro del área imprimible de las impresoras domésticas y de oficina habituales,
          así que no tienes nada que ajustar después.
        </p>

        <h2>Imprime al 100 % en vez de &laquo;ajustar a la página&raquo;</h2>
        <p>
          La escala estropea más impresiones que cualquier otro ajuste. &laquo;Ajustar a la
          página&raquo;, &laquo;reducir páginas grandes&raquo; y &laquo;escalar para ajustar&raquo;
          sirven para rescatar documentos con márgenes demasiado justos. El PDF de este sitio tiene
          margen de sobra, así que ese ajuste encoge la cuadrícula unos puntos porcentuales para
          nada, y lo notas cuando escribes tres números candidatos en una esquina.
        </p>
        <p>
          En la mayoría de los cuadros de impresión, la opción que quieres es <strong>Tamaño
          real</strong> o <strong>100 %</strong>. Compruébala cada vez, porque algunos controladores
          vuelven por su cuenta a ajustar a la página.
        </p>

        <h2>Elige los sudokus por página según cómo resuelves</h2>
        <p>
          El diseño fija el tamaño de la cuadrícula, y el tamaño de la cuadrícula decide lo cómodo
          que resulta el sudoku. En A4 con márgenes estándar, un sudoku por página da una cuadrícula
          de unos 17 cm, dos de unos 12 cm, cuatro de unos 8 cm y seis de unos 6,5 cm.
        </p>
        <p>
          Si resuelves sin anotar candidatos, seis por página funcionan y ahorran mucho papel. Si
          anotas candidatos a lápiz, algo que necesitarás por encima del nivel medio, te hacen
          falta casillas de unos 12 mm para escribir tres cifras pequeñas con claridad, y eso
          significa dos por página. Para las{' '}
          <Link href={L('/printable-sudoku/expert')}>cuadrículas expertas</Link>, donde acabarás
          anotando casi todas las casillas vacías, una por página compensa el papel.
        </p>
        <p>
          Un valor por defecto razonable: fácil y medio a{' '}
          <Link href={L('/printable-sudoku-4-per-page')}>cuatro por página</Link>, difícil a dos,
          experto a una.
        </p>

        <h2>Mantén las soluciones aparte</h2>
        <p>
          Si imprimes para otras personas, la colocación de las soluciones importa. El PDF pone
          todas las soluciones en su propia sección después de los sudokus, en hojas separadas,
          para que puedas repartir la primera mitad y quedarte con la segunda. Cada solución lleva
          el mismo código de seis caracteres que su sudoku, así que puedes separar las páginas y
          emparejarlas después. Si las soluciones se pierden, el mismo código recupera la
          respuesta en la{' '}
          <Link href={L('/sudoku-answers')}>página de búsqueda de soluciones</Link>.
        </p>
        <p>
          Para prescindir de las soluciones, desmarca la opción antes de generar, o imprime solo
          la primera mitad del documento, porque las soluciones van al final. La página de{' '}
          <Link href={L('/printable-sudoku-with-answers')}>sudoku para imprimir con soluciones</Link>{' '}
          explica cómo funcionan.
        </p>

        <h2>Papel y tinta</h2>
        <p>
          El papel de fotocopiadora normal de 80 g/m² funciona, y es el que usa la mayoría. Si
          aprietas mucho el lápiz o borras a menudo, uno de 90 a 100 g/m² aguanta mejor, porque
          borrar sobre papel fino deja una mancha gris que dificulta leer las anotaciones.
        </p>
        <p>
          Imprime en blanco y negro, en modo borrador o económico. Las cuadrículas son solo líneas,
          sin sombreados, así que la calidad borrador se ve igual y gasta más o menos la mitad de
          tinta. Evita los ajustes de color o de foto, que imprimen más lento con el mismo
          resultado.
        </p>
        <p>
          En una impresora que no hayas usado antes para sudokus, imprime primero una sola página.
          Comprueba que los bordes de las regiones se ven más gruesos que las líneas de las
          casillas, que los números salen nítidos y que no hay nada recortado. Luego envía las otras
          diecinueve páginas.
        </p>

        <h2>Imprimir para un grupo</h2>
        <p>
          Para un aula, una residencia o un viaje largo, genera un solo lote en vez de varios. Una
          tanda de 24 sudokus a cuatro por página ocupa seis hojas, o tres a doble cara, más otras
          tantas para las soluciones. Plantéate mezclar dificultades: marca más de un nivel y el
          generador reparte la tanda por igual entre ellos, de más fácil a más difícil. Un lote
          mixto mantiene a un grupo de niveles distintos avanzando a un ritmo parecido.
        </p>
        <p>
          El generador crea sudokus nuevos en cada tirada en vez de sacarlos de una biblioteca
          fija, así que dos personas que impriman el mismo día obtienen cuadrículas distintas, y
          puedes imprimir un segundo lote para otro grupo sin que nadie lo reconozca.{' '}
          <Link href={L('/')}>Define tu tanda</Link> e imprímela.
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        A printed sudoku beats a screen: you can see all your pencil marks at once, scribble freely
        and leave the sheet on the kitchen table for a week. A bad print loses those advantages,
        with grids too small to annotate, box borders you cannot tell from the cell lines, or a page
        clipped at the edge. Four settings fix most of that.
      </p>

      <h2>Match the page size to your paper, before you generate</h2>
      <p>
        A4 measures 210 × 297 mm and US Letter 216 × 279 mm, so Letter is wider and shorter. The
        difference is small, but if you print an A4 layout on Letter paper, the printer either
        scales everything down or crops the bottom, and either way you lose grid size.
      </p>
      <p>
        Pick the right size in the generator instead of fixing it in the print dialog. The generator
        lays the page out at your chosen size with 16 mm margins on all four sides, inside the
        printable area of common home and office printers, so you have nothing to adjust afterwards.
      </p>

      <h2>Print at 100% instead of &ldquo;fit to page&rdquo;</h2>
      <p>
        Scaling spoils more prints than any other setting. &ldquo;Fit to page&rdquo;, &ldquo;shrink
        oversized pages&rdquo; and &ldquo;scale to fit&rdquo; exist to rescue documents with margins
        that are too tight. The PDF from this site has room to spare, so the setting shrinks the
        grid by a few percent for nothing, and you notice the loss when you write three candidate
        digits into a corner.
      </p>
      <p>
        In most print dialogs the option you want is <strong>Actual size</strong> or{' '}
        <strong>100%</strong>. Check it each time, because some printer drivers reset to fit-to-page
        on their own.
      </p>

      <h2>Choose puzzles per page for how you solve</h2>
      <p>
        The layout sets your grid size, and the grid size decides how comfortable the puzzle is. On
        A4 with standard margins, one puzzle per page gives about a 17 cm grid, two give about 12
        cm, four about 8 cm and six about 6.5 cm.
      </p>
      <p>
        If you solve without candidate marks, six per page works and saves a lot of paper. If
        you pencil in candidates, which you will need above medium, you need cells of about 12
        mm to write three small digits legibly, and that means two per page. For{' '}
        <Link href={L('/printable-sudoku/expert')}>expert grids</Link>, where you end up marking
        nearly every empty cell, one per page is worth the paper.
      </p>
      <p>
        A reasonable default: easy and medium at{' '}
        <Link href={L('/printable-sudoku-4-per-page')}>four per page</Link>, hard at two, expert
        at one.
      </p>

      <h2>Keep the answer key separate</h2>
      <p>
        If you print for other people, the placement of the answers matters. The PDF puts the
        whole answer key in its own section after the puzzles, on separate sheets, so you can
        hand out the front half and keep the back. Each solution carries the same six-character
        code as its puzzle, so you can split the pages up and match them later. If the key goes
        missing, the same code fetches the answer on the{' '}
        <Link href={L('/sudoku-answers')}>answer lookup page</Link>.
      </p>
      <p>
        To leave the answers out, untick the option before generating, or print only the first
        half of the document, since the key comes last. The{' '}
        <Link href={L('/printable-sudoku-with-answers')}>printable sudoku with answers</Link>{' '}
        page explains the key in more detail.
      </p>

      <h2>Paper and ink</h2>
      <p>
        Ordinary 80 gsm copier paper works, and most people use it. If you press hard with a pencil
        or plan to erase a lot, 90 to 100 gsm paper holds up better, because erasing on thin paper
        leaves a grey smear that makes candidate marks hard to read.
      </p>
      <p>
        Print in black and white, in draft or economy mode. The grids are line work with no shading,
        so draft quality looks the same and uses about half the ink. Skip colour and photo settings,
        which print slower and give the same result.
      </p>
      <p>
        On a printer you have not used for sudoku before, print a single page first. Check that the
        box borders look heavier than the cell lines, that the digits are crisp and that nothing is
        clipped. Then send the other nineteen pages.
      </p>

      <h2>Printing for a group</h2>
      <p>
        For a classroom, a care home or a long journey, generate one batch instead of several. A run
        of 24 puzzles at four per page fills six sheets, or three double-sided, plus the same again
        for the key. Consider mixing difficulties: tick more than one level and the generator splits
        the run evenly across them, easiest first. A mixed set keeps a room of different abilities
        moving at about the same pace.
      </p>
      <p>
        The generator makes fresh puzzles each run instead of pulling them from a fixed library,
        so two people printing on the same day get different grids, and you can run off a second
        set for a second group without anyone recognising it.{' '}
        <Link href={L('/')}>Set your run</Link> and print it.
      </p>
    </>
  );
}
