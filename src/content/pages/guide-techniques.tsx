import Link from 'next/link';
import { localizedPath, type Locale } from '@/i18n/config';

export function SolvingTechniquesBody({ locale }: { locale: Locale }) {
  const L = (p: string) => localizedPath(locale, p);

  if (locale === 'de') {
    return (
      <>
        <p>
          Absuchen bringt dich durch einfache Sudokus und durch den Großteil der mittelschweren.
          Danach findest du keine Felder mehr. Die Techniken unten wenden dieselbe Logik auf
          Kandidatennotizen statt auf Ziffern an und bringen ein festgefahrenes Brett wieder in
          Bewegung. Sie stehen ungefähr in der Reihenfolge, in der du zu ihnen greifen solltest.
        </p>
        <p>
          Jede setzt voraus, dass du Kandidaten in die leeren Felder eingetragen hast. Falls
          nicht, hol das zuerst nach, denn ohne sie siehst du keines dieser Muster. Ist die
          Kandidaten-Notation neu für dich, fang mit{' '}
          <Link href={L('/guides/how-to-solve-sudoku')}>Sudoku lösen für Einsteiger</Link> an und
          komm dann zurück.
        </p>

        <h2>1. Offene Paare, Trios und Quadrupel</h2>
        <p>
          Ein <strong>offenes Paar</strong> sind zwei Felder im selben Bereich (einer Zeile, einer
          Spalte oder einem Block), die dieselben zwei Kandidaten tragen. Lauten zwei Felder in
          Zeile 4 beide {'{'}2, 8{'}'}, enthält eines die 2 und das andere die 8. Welches welches
          ist, musst du nicht wissen. Zusammen verbrauchen sie die 2 und die 8 von Zeile 4, also
          kannst du 2 und 8 in den übrigen Feldern von Zeile 4 streichen.
        </p>
        <p>
          Dieselbe Idee lässt sich erweitern. Drei Felder, die sich drei Kandidaten teilen, bilden
          ein offenes Trio, und vier Felder, die sich vier teilen, ein Quadrupel. Nicht jedes Feld
          braucht alle Kandidaten: {'{'}2,8{'}'}, {'{'}2,5{'}'} und {'{'}5,8{'}'} über drei Felder
          ergeben ein gültiges Trio auf 2, 5 und 8, weil diese drei Ziffern auf diese drei Felder
          festgelegt sind. Nach Trios lohnt sich die Suche. Quadrupel sind so selten, dass du meist
          zuerst etwas anderes findest.
        </p>

        <h2>2. Versteckte Paare</h2>
        <p>
          Ein verstecktes Paar ist dieselbe Situation in Verkleidung. Zwei Ziffern können nur in
          zwei Feldern eines Bereichs stehen, aber diese Felder tragen auch andere Kandidaten,
          sodass das Paar schwer zu sehen ist. Kommen in einem Block die 4 und die 9 beide nur in
          den Feldern A und B vor, enthalten A und B die 4 und die 9 in irgendeiner Reihenfolge, und
          du kannst die übrigen Kandidaten aus A und B löschen.
        </p>
        <p>
          Löser nutzen versteckte Paare zu selten, weil ein offenes Paar auf der Seite auffällt und
          ein verstecktes nicht. Um sie zu finden, geh einen Bereich Ziffer für Ziffer durch und
          notiere, welche Felder jede Ziffer belegen könnte, statt Feld für Feld zu lesen. Zwei
          Ziffern mit demselben Zwei-Felder-Muster bilden dein Paar.
        </p>

        <h2>3. Zeigende Paare und Block-Zeilen-Reduktion</h2>
        <p>
          Diese beiden nutzen die Überschneidung zwischen einem Block und den Zeilen oder Spalten,
          die ihn kreuzen, und zusammen erledigen sie den Großteil der Arbeit beim{' '}
          <Link href={L('/printable-sudoku/hard')}>schweren Sudoku</Link>.
        </p>
        <p>
          Ein <strong>zeigendes Paar</strong> arbeitet vom Block nach außen. Liegen alle möglichen
          Positionen für die 6 innerhalb eines Blocks in derselben Zeile, steht die 6 dieses Blocks
          irgendwo in dieser Zeile. Du weißt nicht wo, aber du weißt, dass die 6 in dieser Zeile
          außerhalb des Blocks nicht stehen kann, also streiche sie aus diesen Feldern.
        </p>
        <p>
          <strong>Block-Zeilen-Reduktion</strong> führt dasselbe Argument umgekehrt. Liegen alle
          möglichen Positionen für die 6 in einer Zeile innerhalb eines einzigen Blocks, steht die 6
          dieses Blocks in dieser Zeile, und du kannst die 6 aus den anderen sechs Feldern des
          Blocks streichen.
        </p>
        <p>
          Beide lassen sich leicht anwenden, sobald du nach ihnen suchst, und die Streichungen, die
          sie liefern, führen meist innerhalb von ein, zwei Zügen zu einem offenen oder versteckten
          Single.
        </p>

        <h2>4. Der X-Wing</h2>
        <p>
          Der X-Wing ist die erste Technik, die das ganze Brett umspannt, und viele Löser merken,
          dass er ihren Blick auf ein Raster verändert.
        </p>
        <p>
          Such eine Ziffer, etwa 7, die in zwei verschiedenen Zeilen jeweils nur in zwei Feldern
          stehen kann. Prüfe jetzt die Spalten: Liegen diese beiden Felder in beiden Zeilen im
          selben Spaltenpaar, hast du einen X-Wing. Die vier Felder bilden ein Rechteck. Wie die 7en
          auch fallen, sie besetzen ein Feld aus jeder Zeile und eines aus jeder Spalte, auf einer
          Diagonale des Rechtecks. So oder so haben beide Spalten ihre 7 innerhalb des Rechtecks,
          also kannst du die 7 aus den übrigen Feldern beider Spalten streichen.
        </p>
        <p>
          Dasselbe funktioniert mit vertauschten Rollen: Zwei Spalten mit jeweils zwei Positionen,
          ausgerichtet auf dieselben zwei Zeilen, erlauben Streichungen in diesen Zeilen. Ein X-Wing
          löst selten selbst ein Feld. Er entfernt Kandidaten, die eine einfachere Technik blockiert
          haben.
        </p>

        <h2>5. Swordfish und darüber hinaus</h2>
        <p>
          Ein Swordfish erweitert den X-Wing auf drei Zeilen und drei Spalten. Ist eine Ziffer in
          jeder von drei Zeilen auf höchstens drei Felder beschränkt, alle innerhalb derselben
          drei Spalten, kannst du diese Ziffer aus dem Rest dieser Spalten streichen.
          Swordfish-Muster tauchen auf{' '}
          <Link href={L('/printable-sudoku/expert')}>Experten-Rastern</Link> auf, und ohne
          systematisches Absuchen entdeckst du sie selten.
        </p>
        <p>
          Darüber hinaus liegen XY-Wings, eindeutige Rechtecke und erzwingende Ketten. Lern sie,
          wenn dir die Jagd Spaß macht, aber jede bringt weniger als die vorige: Die meisten
          Experten-Rätsel geben nach mit Kandidaten-Notation, Paaren, zeigenden Paaren und einem
          geduldigen X-Wing. Greifst du zu einer erzwingenden Kette, hast du vermutlich etwas
          Einfacheres übersehen.
        </p>

        <h2>Eine Arbeitsreihenfolge</h2>
        <p>
          Stockt ein Raster, geh diese Liste durch:
        </p>
        <ol>
          <li>
            Erneut nach offenen und versteckten Singles suchen; dein letzter Durchgang hat vermutlich
            welche erzeugt.
          </li>
          <li>
            Jeden Bereich nach offenen Paaren und Trios durchsuchen.
          </li>
          <li>
            Jeden Bereich Ziffer für Ziffer nach versteckten Paaren durchgehen.
          </li>
          <li>
            Jeden Block auf zeigende Paare prüfen, dann jede Zeile und Spalte auf
            Block-Zeilen-Reduktion.
          </li>
          <li>
            Dann nach einem X-Wing suchen.
          </li>
        </ol>
        <p>
          Jeder Schritt speist die darüberliegenden, also geh nach jeder erfolgreichen Streichung
          wieder an den Anfang der Liste.
        </p>

        <h2>Auf Papier üben</h2>
        <p>
          Diese Techniken lernst du auf einem gedruckten Raster schneller als auf einem
          Bildschirm, weil du alle Kandidatennotizen auf einmal siehst und frei notieren kannst.
          Drucke einen Satz <Link href={L('/printable-sudoku/hard')}>schwerer</Link> Rätsel mit
          einem oder zwei pro Seite, damit du Platz zum Schreiben hast, und behalte den{' '}
          <Link href={L('/printable-sudoku-with-answers')}>Lösungsschlüssel</Link>, um dich am
          Ende selbst zu prüfen. Der Lösungsalgorithmus bestätigt für jedes Rätsel aus{' '}
          <Link href={L('/')}>dem Generator</Link> genau eine Lösung. Führt dich eine Technik in
          einen Widerspruch, such den Fehler also in deinen Bleistiftnotizen.
        </p>
      </>
    );
  }

  if (locale === 'fr') {
    return (
      <>
        <p>
          Le balayage vous mène au bout des grilles faciles et de la plupart des grilles moyennes.
          Au-delà, vous ne trouvez plus de cases. Les techniques ci-dessous appliquent la même
          logique aux annotations de candidats plutôt qu’aux chiffres, et elles débloquent un
          plateau à l’arrêt. Elles apparaissent à peu près dans l’ordre où vous devriez y recourir.
        </p>
        <p>
          Chacune suppose que vous avez noté les candidats dans les cases vides. Sinon, faites-le
          d’abord : sans eux, vous ne verrez aucun de ces motifs. Si la notation des candidats est
          nouvelle pour vous, commencez par{' '}
          <Link href={L('/guides/how-to-solve-sudoku')}>comment résoudre un sudoku</Link> avant de
          revenir ici.
        </p>

        <h2>1. Paires, triplets et quadruplets nus</h2>
        <p>
          Une <strong>paire nue</strong> désigne deux cases d’une même zone (une ligne, une colonne
          ou un bloc) qui contiennent les deux mêmes candidats. Si deux cases de la ligne 4
          affichent toutes deux {'{'}2, 8{'}'}, l’une contient le 2 et l’autre le 8. Vous n’avez pas
          besoin de savoir laquelle. À elles deux, elles épuisent le 2 et le 8 de la ligne 4 : vous
          pouvez rayer 2 et 8 des autres cases de la ligne 4.
        </p>
        <p>
          La même idée se généralise. Trois cases qui partagent trois candidats forment un triplet
          nu, et quatre cases qui en partagent quatre forment un quadruplet. Chaque case n’a pas
          besoin de tous les candidats : {'{'}2,8{'}'}, {'{'}2,5{'}'} et {'{'}5,8{'}'} sur trois
          cases forment un triplet valide sur 2, 5 et 8, car ces trois chiffres sont verrouillés
          dans ces trois cases. Les triplets valent la peine d’être cherchés. Les quadruplets sont
          assez rares pour que vous trouviez en général autre chose avant.
        </p>

        <h2>2. Paires cachées</h2>
        <p>
          Une paire cachée est la même situation déguisée. Deux chiffres ne peuvent apparaître que
          dans deux cases d’une zone, mais ces cases portent aussi d’autres candidats, si bien que
          la paire se voit mal. Si, dans un bloc, le 4 et le 9 n’apparaissent que dans les cases A
          et B, alors A et B contiennent le 4 et le 9 dans un ordre ou dans l’autre, et vous pouvez
          supprimer les autres candidats de A et B.
        </p>
        <p>
          Les joueurs sous-utilisent les paires cachées, car une paire nue saute aux yeux alors
          qu’une paire cachée non. Pour les trouver, parcourez une zone chiffre par chiffre en
          notant les cases que chaque chiffre pourrait occuper, au lieu de lire case par case. Deux
          chiffres qui partagent la même empreinte de deux cases forment votre paire.
        </p>

        <h2>3. Paires pointantes et réduction bloc-ligne</h2>
        <p>
          Ces deux techniques exploitent le recoupement entre un bloc et les lignes ou colonnes
          qui le traversent, et ensemble elles font l’essentiel du travail sur le{' '}
          <Link href={L('/printable-sudoku/hard')}>sudoku difficile</Link>.
        </p>
        <p>
          Une <strong>paire pointante</strong> travaille du bloc vers l’extérieur. Si toutes les
          positions possibles du 6 dans un bloc se trouvent sur la même ligne, le 6 de ce bloc se
          trouve quelque part sur cette ligne. Vous ne savez pas où, mais vous savez que le 6 ne
          peut se trouver nulle part ailleurs sur cette ligne en dehors du bloc : rayez-le de ces
          cases.
        </p>
        <p>
          La <strong>réduction bloc-ligne</strong> retourne le même raisonnement. Si toutes les
          positions possibles du 6 sur une ligne se trouvent dans un seul bloc, le 6 de ce bloc est
          sur cette ligne, et vous pouvez rayer le 6 des six autres cases du bloc.
        </p>
        <p>
          Les deux s’appliquent facilement dès que vous les cherchez, et leurs éliminations mènent
          en général à un simple nu ou caché en un coup ou deux.
        </p>

        <h2>4. Le X-wing</h2>
        <p>
          Le X-wing est la première technique qui s’étend sur tout le plateau, et beaucoup de
          joueurs trouvent qu’il change leur façon de regarder une grille.
        </p>
        <p>
          Trouvez un chiffre, disons 7, qui ne peut aller que dans deux cases sur chacune de deux
          lignes différentes. Vérifiez maintenant les colonnes : si ces deux cases se trouvent dans
          la même paire de colonnes sur les deux lignes, vous avez un X-wing. Les quatre cases
          forment un rectangle. Quelle que soit la façon dont les 7 se placent, ils prennent une
          case de chaque ligne et une de chaque colonne, sur une diagonale du rectangle. Dans les
          deux cas, les deux colonnes ont leur 7 dans le rectangle : vous pouvez éliminer le 7 des
          autres cases de ces deux colonnes.
        </p>
        <p>
          Le même principe fonctionne avec les rôles inversés : deux colonnes avec deux positions
          chacune, alignées sur les deux mêmes lignes, permettent d’éliminer dans ces lignes. Un
          X-wing résout rarement une case à lui seul. Il supprime des candidats qui bloquaient une
          technique plus simple.
        </p>

        <h2>5. Le swordfish et au-delà</h2>
        <p>
          Un swordfish élargit le X-wing à trois lignes et trois colonnes. Si un chiffre est
          limité à trois cases au plus sur chacune de trois lignes, toutes dans les trois mêmes
          colonnes, vous pouvez éliminer ce chiffre du reste de ces colonnes. Les swordfish
          apparaissent sur les <Link href={L('/printable-sudoku/expert')}>grilles expert</Link>,
          et vous en repérerez rarement un sans balayage systématique.
        </p>
        <p>
          Au-delà se trouvent les XY-wings, les rectangles uniques et les chaînes forcées.
          Apprenez-les si vous aimez la traque, mais chacune apporte moins que la précédente : la
          plupart des grilles expert cèdent à la notation des candidats, aux paires, aux paires
          pointantes et à un X-wing patient. Si vous recourez à une chaîne forcée, vous avez sans
          doute manqué quelque chose de plus simple.
        </p>

        <h2>Un ordre de travail</h2>
        <p>
          Quand une grille se bloque, parcourez cette liste :
        </p>
        <ol>
          <li>
            Recherchez à nouveau les simples nus et cachés ; votre dernier passage en a sans doute
            créé.
          </li>
          <li>
            Balayez chaque zone à la recherche de paires et triplets nus.
          </li>
          <li>
            Parcourez chaque zone chiffre par chiffre à la recherche de paires cachées.
          </li>
          <li>
            Vérifiez chaque bloc pour des paires pointantes, puis chaque ligne et colonne pour une
            réduction bloc-ligne.
          </li>
          <li>
            Cherchez ensuite un X-wing.
          </li>
        </ol>
        <p>
          Chaque étape nourrit celles qui la précèdent : après toute élimination réussie, revenez en
          haut de la liste.
        </p>

        <h2>S’entraîner sur papier</h2>
        <p>
          Vous apprendrez ces techniques plus vite sur une grille imprimée que sur un écran, car
          vous voyez toutes vos annotations d’un coup et pouvez annoter librement. Imprimez un lot
          de grilles <Link href={L('/printable-sudoku/hard')}>difficiles</Link> à une ou deux par
          page pour avoir de la place pour écrire, et gardez le{' '}
          <Link href={L('/printable-sudoku-with-answers')}>corrigé</Link> pour vous vérifier à la
          fin. Le solveur confirme que chaque grille issue{' '}
          <Link href={L('/')}>du générateur</Link> n’a qu’une seule solution : si une technique
          vous mène à une contradiction, cherchez l’erreur dans vos annotations au crayon.
        </p>
      </>
    );
  }

  if (locale === 'es') {
    return (
      <>
        <p>
          Repasar la cuadrícula te lleva por los sudokus fáciles y la mayor parte de los de nivel
          medio. Más allá, dejas de encontrar casillas. Las técnicas de abajo aplican la misma
          lógica a las anotaciones de candidatos en vez de a los números, y desatascan un tablero
          parado. Aparecen más o menos en el orden en que deberías recurrir a ellas.
        </p>
        <p>
          Todas suponen que has anotado los candidatos en las casillas vacías. Si no lo has hecho,
          hazlo primero, porque sin ellos no verás ninguno de estos patrones. Si la anotación de
          candidatos es nueva para ti, empieza por{' '}
          <Link href={L('/guides/how-to-solve-sudoku')}>cómo resolver un sudoku</Link> y vuelve
          después.
        </p>

        <h2>1. Parejas, tríos y cuádruples simples</h2>
        <p>
          Una <strong>pareja simple</strong> son dos casillas de la misma zona (una fila, una
          columna o una región) con los mismos dos candidatos. Si dos casillas de la fila 4 muestran
          ambas {'{'}2, 8{'}'}, una lleva el 2 y la otra el 8. No necesitas saber cuál. Entre las
          dos agotan el 2 y el 8 de la fila 4, así que puedes tachar el 2 y el 8 del resto de
          casillas de la fila 4.
        </p>
        <p>
          La misma idea se amplía. Tres casillas que comparten tres candidatos forman un trío
          simple, y cuatro casillas que comparten cuatro forman un cuádruple. No hace falta que cada
          casilla tenga todos los candidatos: {'{'}2,8{'}'}, {'{'}2,5{'}'} y {'{'}5,8{'}'} en tres
          casillas forman un trío válido sobre 2, 5 y 8, porque esos tres números quedan bloqueados
          en esas tres casillas. Merece la pena buscar tríos. Los cuádruples son tan raros que
          normalmente encontrarás otra cosa antes.
        </p>

        <h2>2. Parejas ocultas</h2>
        <p>
          Una pareja oculta es la misma situación disfrazada. Dos números solo pueden aparecer en
          dos casillas de una zona, pero esas casillas llevan también otros candidatos, así que la
          pareja cuesta de ver. Si en una región el 4 y el 9 solo aparecen en las casillas A y B,
          entonces A y B llevan el 4 y el 9 en algún orden, y puedes borrar los demás candidatos de
          A y B.
        </p>
        <p>
          Quienes resuelven sudokus aprovechan poco las parejas ocultas, porque una pareja simple
          salta a la vista y una oculta no. Para encontrarlas, recorre una zona número por número y
          anota qué casillas podría ocupar cada número, en vez de leer casilla por casilla. Dos
          números con la misma huella de dos casillas forman tu pareja.
        </p>

        <h2>3. Parejas apuntadoras y reducción caja-línea</h2>
        <p>
          Estas dos técnicas aprovechan el cruce entre una región y las filas o columnas que la
          atraviesan, y juntas hacen la mayor parte del trabajo en el{' '}
          <Link href={L('/printable-sudoku/hard')}>sudoku difícil</Link>.
        </p>
        <p>
          Una <strong>pareja apuntadora</strong> trabaja de la región hacia fuera. Si todas las
          posiciones posibles del 6 dentro de una región están en la misma fila, el 6 de esa región
          está en algún punto de esa fila. No sabes dónde, pero sabes que el 6 no puede estar en
          ningún otro sitio de esa fila fuera de la región, así que táchalo de esas casillas.
        </p>
        <p>
          La <strong>reducción caja-línea</strong> aplica el mismo argumento al revés. Si todas las
          posiciones posibles del 6 en una fila están dentro de una sola región, el 6 de esa región
          está en esa fila, y puedes tachar el 6 de las otras seis casillas de la región.
        </p>
        <p>
          Ambas son fáciles de aplicar en cuanto las buscas, y las eliminaciones que te dan suelen
          llevar a un único simple u oculto en uno o dos movimientos.
        </p>

        <h2>4. El X-wing</h2>
        <p>
          El X-wing es la primera técnica que abarca todo el tablero, y a mucha gente le cambia la
          forma de mirar una cuadrícula.
        </p>
        <p>
          Busca un número, digamos el 7, que solo pueda ir en dos casillas en cada una de dos filas
          distintas. Ahora comprueba las columnas: si esas dos casillas caen en el mismo par de
          columnas en ambas filas, tienes un X-wing. Las cuatro casillas forman un rectángulo.
          Caigan como caigan los 7, ocupan una casilla de cada fila y una de cada columna, sobre una
          diagonal del rectángulo. En cualquier caso, ambas columnas tienen su 7 dentro del
          rectángulo, así que puedes eliminar el 7 del resto de casillas de las dos columnas.
        </p>
        <p>
          Lo mismo funciona con los papeles invertidos: dos columnas con dos posiciones cada una,
          alineadas en las dos mismas filas, te permiten eliminar en esas filas. Un X-wing rara vez
          resuelve una casilla por sí solo. Quita candidatos que bloqueaban una técnica más
          sencilla.
        </p>

        <h2>5. El swordfish y más allá</h2>
        <p>
          Un swordfish amplía el X-wing a tres filas y tres columnas. Si un número está limitado a
          tres casillas como máximo en cada una de tres filas, todas dentro de las mismas tres
          columnas, puedes eliminar ese número del resto de esas columnas. Los swordfish aparecen
          en las <Link href={L('/printable-sudoku/expert')}>cuadrículas expertas</Link>, y rara
          vez darás con uno sin un repaso sistemático.
        </p>
        <p>
          Más allá están los XY-wing, los rectángulos únicos y las cadenas forzadas. Apréndelos si
          te gusta la caza, pero cada uno aporta menos que el anterior: la mayoría de los sudokus
          expertos caen con anotación de candidatos, parejas, parejas apuntadoras y un X-wing
          aplicado con paciencia. Si te ves recurriendo a una cadena forzada, probablemente se te ha
          escapado algo más sencillo.
        </p>

        <h2>Un orden de trabajo</h2>
        <p>
          Cuando una cuadrícula se atasque, recorre esta lista:
        </p>
        <ol>
          <li>
            Vuelve a buscar únicos simples y ocultos; tu última pasada probablemente ha creado alguno.
          </li>
          <li>
            Repasa cada zona buscando parejas y tríos simples.
          </li>
          <li>
            Recorre cada zona número por número buscando parejas ocultas.
          </li>
          <li>
            Revisa cada región en busca de parejas apuntadoras, y luego cada fila y columna en busca
            de reducción caja-línea.
          </li>
          <li>
            Después, busca un X-wing.
          </li>
        </ol>
        <p>
          Cada paso alimenta a los anteriores, así que tras cualquier eliminación con éxito, vuelve
          al principio de la lista.
        </p>

        <h2>Practica en papel</h2>
        <p>
          Aprenderás estas técnicas más rápido en una cuadrícula impresa que en una pantalla,
          porque ves todas tus anotaciones de golpe y puedes anotar con libertad. Imprime un lote
          de sudokus <Link href={L('/printable-sudoku/hard')}>difíciles</Link> a uno o dos por
          página para tener sitio donde escribir, y guarda las{' '}
          <Link href={L('/printable-sudoku-with-answers')}>soluciones</Link> para comprobarte al
          terminar. El solucionador confirma que cada sudoku que sale del{' '}
          <Link href={L('/')}>generador</Link> tiene exactamente una solución, así que si una
          técnica te lleva a una contradicción, busca el fallo en tus anotaciones a lápiz.
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        Scanning gets you through easy sudoku and most of medium. Past that, you stop finding cells.
        The techniques below apply the same logic to candidate marks instead of digits, and they get
        a stalled board moving again. They appear roughly in the order you should reach for them.
      </p>
      <p>
        Each one assumes you have pencilled candidates into the empty cells. If you have not, do
        that first, because you cannot see any of these patterns without them. If candidate
        marking is new to you, start with{' '}
        <Link href={L('/guides/how-to-solve-sudoku')}>how to solve sudoku</Link> and come back.
      </p>

      <h2>1. Naked pairs, triples and quads</h2>
      <p>
        A <strong>naked pair</strong> is two cells in the same region (a row, a column or a box)
        that hold the same two candidates. If two cells in row 4 both read {'{'}2, 8{'}'}, one of
        them holds the 2 and the other the 8. You do not need to know which. Between them they use
        up row 4&rsquo;s 2 and 8, so you can strike 2 and 8 from the other cells in row 4.
      </p>
      <p>
        The same idea scales. Three cells that share three candidates between them form a naked
        triple, and four cells sharing four form a quad. Each cell does not need all the candidates:{' '}
        {'{'}2,8{'}'}, {'{'}2,5{'}'} and {'{'}5,8{'}'} across three cells make a valid triple on 2,
        5 and 8, because those three digits are locked into those three cells. Triples are worth
        hunting for. Quads are rare enough that you will usually find something else first.
      </p>

      <h2>2. Hidden pairs</h2>
      <p>
        A hidden pair is the same situation in disguise. Two digits can appear in only two cells of
        a region, but those cells carry other candidates too, so the pair is hard to see. If in one
        box the 4 and the 9 both appear only in cells A and B, then A and B hold the 4 and the 9 in
        some order, and you can delete the other candidates from A and B.
      </p>
      <p>
        Solvers under-use hidden pairs, because a naked pair stands out on the page and a hidden one
        does not. To find them, go through a region digit by digit and note which cells each digit
        could occupy, instead of reading cell by cell. Two digits with the same two-cell footprint
        form your pair.
      </p>

      <h2>3. Pointing pairs and box-line reduction</h2>
      <p>
        These two use the overlap between a box and the rows or columns crossing it, and
        together they do most of the work on{' '}
        <Link href={L('/printable-sudoku/hard')}>hard sudoku</Link>.
      </p>
      <p>
        A <strong>pointing pair</strong> works outward from the box. If each possible position for
        the 6 inside one box lies in the same row, the box&rsquo;s 6 sits somewhere in that row. You
        do not know where, but you know the 6 cannot sit anywhere else in that row outside the box,
        so strike it from those cells.
      </p>
      <p>
        <strong>Box-line reduction</strong> runs the same argument in reverse. If each possible
        position for the 6 in a row lies inside a single box, that box&rsquo;s 6 is in that row, and
        you can strike the 6 from the box&rsquo;s other six cells.
      </p>
      <p>
        Both are easy to apply once you look for them, and the eliminations they give you usually
        lead to a naked or hidden single within a move or two.
      </p>

      <h2>4. The X-wing</h2>
      <p>
        The X-wing is the first technique that spans the whole board, and many solvers find it
        changes how they look at a grid.
      </p>
      <p>
        Find a digit, say 7, that can go in only two cells in each of two different rows. Now check
        the columns: if those two cells sit in the same pair of columns in both rows, you have an
        X-wing. The four cells form a rectangle. However the 7s fall, they take one cell from each
        row and one from each column, on a diagonal of the rectangle. Either way, both columns have
        their 7 inside the rectangle, so you can eliminate the 7 from the other cells in both
        columns.
      </p>
      <p>
        The same works with the roles swapped: two columns with two positions each, aligned on the
        same two rows, let you eliminate from those rows. An X-wing rarely solves a cell by itself.
        It removes candidates that were blocking a simpler technique.
      </p>

      <h2>5. Swordfish and beyond</h2>
      <p>
        A swordfish widens the X-wing to three rows and three columns. If a digit is confined to
        at most three cells in each of three rows, all within the same three columns, you can
        eliminate that digit from the rest of those columns. Swordfish patterns turn up on{' '}
        <Link href={L('/printable-sudoku/expert')}>expert grids</Link>, and you will rarely spot
        one without a systematic sweep.
      </p>
      <p>
        Beyond that lie XY-wings, unique rectangles and forcing chains. Learn them if you enjoy the
        hunt, but each adds less than the last: most expert puzzles yield to candidate marking,
        pairs, pointing pairs and a patient X-wing. If you find yourself reaching for a forcing
        chain, you have probably missed something simpler.
      </p>

      <h2>A working order</h2>
      <p>
        When a grid stalls, work down this list:
      </p>
      <ol>
        <li>
          Re-scan for naked and hidden singles; your last pass has probably created some.
        </li>
        <li>
          Sweep each region for naked pairs and triples.
        </li>
        <li>
          Go digit by digit through each region looking for hidden pairs.
        </li>
        <li>
          Check each box for pointing pairs, then each row and column for box-line reduction.
        </li>
        <li>
          Then hunt for an X-wing.
        </li>
      </ol>
      <p>
        Each step feeds the ones above it, so after any successful elimination, go back to the top
        of the list.
      </p>

      <h2>Practise on paper</h2>
      <p>
        You will learn these techniques faster on a printed grid than on a screen, because you
        can see all your candidate marks at once and annotate freely. Print a batch of{' '}
        <Link href={L('/printable-sudoku/hard')}>hard</Link> puzzles one or two per page so you
        have room to write, and keep the{' '}
        <Link href={L('/printable-sudoku-with-answers')}>answer key</Link> to check yourself at
        the end. The solver confirms each puzzle from <Link href={L('/')}>the generator</Link>{' '}
        has exactly one solution, so if a technique leads you into a contradiction, look for the
        mistake in your pencil marks.
      </p>
    </>
  );
}
