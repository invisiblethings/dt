import Link from 'next/link';
import { localizedPath, type Locale } from '@/i18n/config';

export function SolvingTechniquesBody({ locale }: { locale: Locale }) {
  const L = (p: string) => localizedPath(locale, p);

  if (locale === 'de') {
    return (
      <>
        <p>
          Absuchen bringt dich durch einfaches Sudoku und den größten Teil von mittelschwerem. Danach
          reicht es nicht mehr, und das Raster verstummt. Was jetzt folgt, ist keine schwerere Logik —
          es ist dieselbe Logik, nur auf Kandidatennotizen statt auf Ziffern angewendet. Das sind die
          Techniken, die ein festgefahrenes Brett wieder in Bewegung bringen, ungefähr in der
          Reihenfolge, in der du zu ihnen greifen solltest.
        </p>
        <p>
          Alle setzen voraus, dass du Kandidaten in die leeren Felder eingetragen hast. Falls nicht,
          hol das zuerst nach; ohne das ist nichts vom Folgenden sichtbar. Und falls die
          Kandidaten-Notation selbst neu für dich ist, fang mit{' '}
          <Link href={L('/guides/how-to-solve-sudoku')}>Sudoku lösen für Einsteiger</Link> an und komm
          dann zurück.
        </p>

        <h2>1. Offene Paare, Trios und Quadrupel</h2>
        <p>
          Ein <strong>offenes Paar</strong> sind zwei Felder im selben Bereich — einer Zeile, einer
          Spalte oder einem Block —, die genau dieselben zwei Kandidaten tragen. Wenn zwei Felder in
          Zeile 4 beide {'{'}2, 8{'}'} lauten, dann ist eines davon die 2 und das andere die 8. Welches
          welches ist, spielt keine Rolle. Wichtig ist, dass sie zusammen die 2 und die 8 von Zeile 4
          verbraucht haben, sodass in jedem anderen Feld von Zeile 4 2 und 8 gestrichen werden können.
        </p>
        <p>
          Dieselbe Idee lässt sich erweitern. Drei Felder, die sich genau drei Kandidaten teilen,
          bilden ein offenes Trio, und vier Felder, die sich vier teilen, ein Quadrupel. Die Felder
          müssen nicht jeweils alle Kandidaten haben — {'{'}2,8{'}'}, {'{'}2,5{'}'} und {'{'}5,8{'}'}{' '}
          über drei Felder ergeben ein gültiges Trio auf 2, 5 und 8, weil diese drei Ziffern auf genau
          diese drei Felder festgelegt sind. Trios lohnen die Suche; Quadrupel sind selten genug, dass
          du meist zuerst etwas anderes findest.
        </p>

        <h2>2. Versteckte Paare</h2>
        <p>
          Ein verstecktes Paar ist dieselbe Situation, nur getarnt. Hier können zwei Ziffern nur in
          zwei Feldern eines Bereichs vorkommen — aber diese Felder tragen auch andere Kandidaten,
          sodass das Paar nicht offensichtlich ist. Kommen in einem Block die 4 und die 9 beide nur in
          den Feldern A und B vor, müssen A und B in irgendeiner Reihenfolge die 4 und die 9 sein, und
          jeder andere Kandidat in A und B kann gestrichen werden.
        </p>
        <p>
          Versteckte Paare sind die Technik, die die meisten Löser zu wenig nutzen, weil ein offenes
          Paar sich optisch von selbst ankündigt und ein verstecktes nicht. Man findet sie, indem man
          einen Bereich Ziffer für Ziffer durchgeht und notiert, welche Felder jede Ziffer belegen
          könnte, statt die Felder zu lesen. Zwei Ziffern mit demselben Zwei-Felder-Muster sind dein
          Paar.
        </p>

        <h2>3. Zeigende Paare und Block-Zeilen-Reduktion</h2>
        <p>
          Diese beiden arbeiten mit dem Zusammenspiel zwischen einem Block und den Zeilen oder Spalten,
          die ihn kreuzen, und zusammen sind sie die Arbeitspferde des{' '}
          <Link href={L('/printable-sudoku/hard')}>schweren Sudoku</Link>.
        </p>
        <p>
          Ein <strong>zeigendes Paar</strong> arbeitet vom Block nach außen. Liegen innerhalb eines
          Blocks alle möglichen Positionen für die 6 in derselben Zeile, dann steht die 6 dieses
          Blocks irgendwo in dieser Zeile — du weißt nicht wo, aber du weißt, dass sie dort ist. Das
          bedeutet, die 6 kann nirgendwo sonst in dieser Zeile außerhalb des Blocks stehen. Streiche
          sie aus diesen Feldern.
        </p>
        <p>
          <strong>Block-Zeilen-Reduktion</strong> ist dasselbe Argument umgekehrt. Liegen alle
          möglichen Positionen für die 6 in einer bestimmten Zeile innerhalb eines einzigen Blocks,
          dann steht die 6 dieses Blocks in dieser Zeile, und die 6 kann aus den anderen sechs Feldern
          des Blocks gestrichen werden.
        </p>
        <p>
          Beide lassen sich leicht anwenden, sobald man nach ihnen sucht, und beide erzeugen meist
          eine Kettenreaktion — die dadurch entstehenden Streichungen erzeugen innerhalb von ein, zwei
          Zügen meist einen offenen Single oder einen versteckten Single.
        </p>

        <h2>4. Der X-Wing</h2>
        <p>
          Der X-Wing ist die erste Technik, die das gesamte Brett umspannt, und der Punkt, an dem sich
          für die meisten Löser Sudoku wie ein anderes Spiel anfühlt.
        </p>
        <p>
          Finde eine Ziffer — sagen wir 7 —, die in zwei verschiedenen Zeilen jeweils nur in zwei
          Feldern stehen kann. Prüfe jetzt die Spalten: Liegen diese beiden Felder in beiden Zeilen im
          selben Spaltenpaar, hast du einen X-Wing. Die vier Felder bilden ein Rechteck. Wie auch immer
          die 7en fallen, sie besetzen ein Feld aus jeder Zeile und eines aus jeder Spalte, entlang
          einer Diagonale dieses Rechtecks. So oder so ist die 7 für beide Spalten innerhalb des
          Rechtecks bereits abgedeckt, sodass die 7 aus jedem anderen Feld in beiden Spalten gestrichen
          werden kann.
        </p>
        <p>
          Dasselbe funktioniert mit vertauschten Rollen: zwei Spalten mit jeweils nur zwei Positionen,
          ausgerichtet auf dieselben zwei Zeilen, streicht aus diesen Zeilen. Ein X-Wing löst selten
          direkt ein Feld. Was er tut, ist Kandidaten zu entfernen, die eine einfachere Technik
          blockiert haben.
        </p>

        <h2>5. Swordfish und darüber hinaus</h2>
        <p>
          Ein Swordfish ist ein auf drei Zeilen und drei Spalten erweiterter X-Wing: Eine Ziffer, die
          in jeder von drei Zeilen auf höchstens drei Felder beschränkt ist, alle innerhalb derselben
          drei Spalten, streicht diese Ziffer aus dem Rest dieser Spalten. Er ist auf{' '}
          <Link href={L('/printable-sudoku/expert')}>Experten-Rastern</Link> wirklich nützlich und ohne
          systematisches Durchsuchen wirklich schwer zu entdecken.
        </p>
        <p>
          Darüber hinaus liegen XY-Wings, eindeutige Rechtecke und erzwingende Ketten. Es lohnt sich,
          sie zu lernen, wenn dir die Jagd Spaß macht, aber der Ertrag nimmt ab: Die meisten
          Experten-Rätsel geben nach mit Kandidaten-Notation, Paaren, zeigenden Paaren und geduldig
          angewendetem X-Wing. Nach einer erzwingenden Kette zu greifen, ist meist ein Zeichen, dass
          etwas Einfacheres übersehen wurde.
        </p>

        <h2>Eine Arbeitsreihenfolge</h2>
        <p>Stockt ein Raster, geh diese Liste durch, statt nur zu starren:</p>
        <ol>
          <li>Erneut nach offenen und versteckten Singles suchen — seit dem letzten Durchgang sind wahrscheinlich welche entstanden.</li>
          <li>Jeden Bereich nach offenen Paaren und Trios durchsuchen.</li>
          <li>Jeden Bereich Ziffer für Ziffer nach versteckten Paaren durchgehen.</li>
          <li>Jeden Block auf zeigende Paare prüfen, dann jede Zeile und Spalte auf Block-Zeilen-Reduktion.</li>
          <li>Erst dann nach einem X-Wing suchen.</li>
        </ol>
        <p>
          Jeder Schritt speist die darüberliegenden, also geh nach jeder erfolgreichen Streichung
          wieder ganz nach oben. Das Brett, das du jetzt vor dir hast, ist nicht mehr das Brett von
          vor einem Zug.
        </p>

        <h2>Auf Papier üben</h2>
        <p>
          Diese Techniken lernt man auf einem gedruckten Raster deutlich leichter als auf einem
          Bildschirm, weil du jede Kandidatennotiz auf einen Blick siehst und frei notieren kannst.
          Drucke einen Satz{' '}
          <Link href={L('/printable-sudoku/hard')}>schwerer</Link> Rätsel mit einem oder zwei pro
          Seite, damit Platz zum Schreiben bleibt, und behalte den{' '}
          <Link href={L('/printable-sudoku-with-answers')}>Lösungsschlüssel</Link>, um dich am Ende
          selbst zu prüfen. Jedes Rätsel aus{' '}
          <Link href={L('/')}>dem Generator</Link> ist auf genau eine Lösung geprüft, wenn dich also
          eine Technik in einen Widerspruch führt, liegt der Fehler in den Bleistiftnotizen und nicht
          im Rätsel.
        </p>
      </>
    );
  }

  if (locale === 'fr') {
    return (
      <>
        <p>
          Le balayage vous mène à travers le sudoku facile et une bonne partie du niveau moyen.
          Au-delà, il ne suffit plus, et la grille se tait. Ce qui suit n’est pas une logique plus
          difficile — c’est la même logique appliquée aux annotations de candidats plutôt qu’aux
          chiffres. Voici les techniques qui débloquent un plateau bloqué, à peu près dans l’ordre où
          vous devriez y recourir.
        </p>
        <p>
          Toutes supposent que vous avez noté les candidats dans les cases vides. Si ce n’est pas
          fait, faites-le d’abord ; rien de ce qui suit n’est visible sans cela. Et si la notation des
          candidats elle-même est nouvelle pour vous, commencez par{' '}
          <Link href={L('/guides/how-to-solve-sudoku')}>comment résoudre un sudoku</Link> avant de
          revenir ici.
        </p>

        <h2>1. Paires, triplets et quadruplets nus</h2>
        <p>
          Une <strong>paire nue</strong> désigne deux cases d’une même zone — une ligne, une colonne
          ou un bloc — qui contiennent exactement les deux mêmes candidats. Si deux cases de la ligne
          4 affichent toutes deux {'{'}2, 8{'}'}, alors l’une contient le 2 et l’autre le 8. Peu
          importe laquelle. Ce qui compte, c’est qu’à elles deux, elles épuisent le 2 et le 8 de la
          ligne 4, si bien que toute autre case de la ligne 4 peut voir le 2 et le 8 rayés.
        </p>
        <p>
          La même idée se généralise. Trois cases partageant exactement trois candidats entre elles
          forment un triplet nu, et quatre cases en partageant quatre forment un quadruplet. Les cases
          n’ont pas besoin d’avoir chacune tous les candidats — {'{'}2,8{'}'}, {'{'}2,5{'}'} et{' '}
          {'{'}5,8{'}'} réparties sur trois cases forment un triplet valide sur 2, 5 et 8, car ces
          trois chiffres sont verrouillés dans ces trois cases. Les triplets valent la peine d’être
          recherchés ; les quadruplets sont assez rares pour que vous trouviez généralement autre
          chose avant.
        </p>

        <h2>2. Paires cachées</h2>
        <p>
          Une paire cachée est la même situation déguisée. Ici, deux chiffres ne peuvent apparaître
          que dans deux cases d’une zone — mais ces cases portent aussi d’autres candidats, si bien
          que la paire n’est pas évidente. Si, dans un bloc, le 4 et le 9 n’apparaissent tous deux que
          dans les cases A et B, alors A et B doivent contenir le 4 et le 9 dans un ordre ou dans
          l’autre, et tout autre candidat dans A et B peut être supprimé.
        </p>
        <p>
          Les paires cachées sont la technique la plus sous-utilisée par les joueurs, car une paire
          nue se signale visuellement alors qu’une paire cachée ne le fait pas. Pour les trouver, il
          faut parcourir une zone chiffre par chiffre, en notant quelles cases chaque chiffre pourrait
          occuper, plutôt que de lire les cases. Deux chiffres partageant la même empreinte de deux
          cases forment votre paire.
        </p>

        <h2>3. Paires pointantes et réduction bloc-ligne</h2>
        <p>
          Ces deux techniques exploitent l’interaction entre un bloc et les lignes ou colonnes qui le
          traversent, et ensemble elles sont les chevaux de bataille du{' '}
          <Link href={L('/printable-sudoku/hard')}>sudoku difficile</Link>.
        </p>
        <p>
          Une <strong>paire pointante</strong> travaille du bloc vers l’extérieur. Si, à l’intérieur
          d’un bloc, toutes les positions possibles pour le 6 se trouvent sur la même ligne, alors le
          6 de ce bloc se trouve quelque part sur cette ligne — vous ne savez pas où, mais vous savez
          qu’il y est. Ce qui signifie que le 6 ne peut se trouver nulle part ailleurs sur cette ligne
          en dehors du bloc. Rayez-le de ces cases.
        </p>
        <p>
          La <strong>réduction bloc-ligne</strong> est le même argument à l’envers. Si toutes les
          positions possibles pour le 6 dans une ligne donnée se trouvent à l’intérieur d’un seul
          bloc, alors le 6 de ce bloc se trouve sur cette ligne, et le 6 peut être rayé des six autres
          cases du bloc.
        </p>
        <p>
          Les deux sont faciles à appliquer une fois qu’on les cherche, et les deux produisent
          généralement une cascade : les éliminations qu’elles génèrent créent souvent un simple nu
          ou un simple caché en un coup ou deux.
        </p>

        <h2>4. Le X-wing</h2>
        <p>
          Le X-wing est la première technique qui s’étend sur tout le plateau, et c’est le moment où
          la plupart des joueurs sentent que le sudoku devient un jeu différent.
        </p>
        <p>
          Trouvez un chiffre — disons 7 — qui, sur deux lignes différentes, ne peut aller que dans
          deux cases chacune. Vérifiez maintenant les colonnes : si, sur les deux lignes, ces deux
          cases se trouvent dans la même paire de colonnes, vous avez un X-wing. Les quatre cases
          forment un rectangle. Quelle que soit la façon dont les 7 se placent, ils occupent une case
          de chaque ligne et une de chaque colonne, sur une diagonale de ce rectangle. Dans tous les
          cas, ces deux colonnes ont leur 7 déjà pris en compte à l’intérieur du rectangle, si bien
          que le 7 peut être éliminé de toutes les autres cases de ces deux colonnes.
        </p>
        <p>
          Le même principe fonctionne avec les rôles inversés : deux colonnes n’ayant que deux
          positions chacune, alignées sur les deux mêmes lignes, permettent d’éliminer dans ces
          lignes. Un X-wing résout rarement une case directement. Ce qu’il fait, c’est supprimer des
          candidats qui bloquaient une technique plus simple.
        </p>

        <h2>5. Le swordfish et au-delà</h2>
        <p>
          Un swordfish est un X-wing élargi à trois lignes et trois colonnes : un chiffre confiné à
          trois cases au maximum dans chacune de trois lignes, toutes situées dans les trois mêmes
          colonnes, permet d’éliminer ce chiffre du reste de ces colonnes. Il est vraiment utile sur
          les <Link href={L('/printable-sudoku/expert')}>grilles expert</Link> et vraiment difficile à
          repérer sans un balayage systématique.
        </p>
        <p>
          Au-delà se trouvent les XY-wings, les rectangles uniques et les chaînes forcées. Ils
          valent la peine d’être appris si vous aimez la traque, mais leur rendement décroît : la
          plupart des grilles expert cèdent avec la notation des candidats, les paires, les paires
          pointantes et un X-wing appliqué patiemment. Recourir à une chaîne forcée est généralement
          le signe que quelque chose de plus simple a été manqué.
        </p>

        <h2>Un ordre de travail</h2>
        <p>Quand une grille se bloque, parcourez cette liste plutôt que de fixer la grille :</p>
        <ol>
          <li>Recherchez à nouveau les simples nus et cachés — vous en avez probablement créé depuis votre dernier passage.</li>
          <li>Balayez chaque zone à la recherche de paires et triplets nus.</li>
          <li>Parcourez chaque zone chiffre par chiffre à la recherche de paires cachées.</li>
          <li>Vérifiez chaque bloc pour des paires pointantes, puis chaque ligne et colonne pour une réduction bloc-ligne.</li>
          <li>C’est seulement alors que vous commencez à chercher un X-wing.</li>
        </ol>
        <p>
          Chaque étape nourrit celles qui la précèdent, donc après toute élimination réussie, revenez
          au début de la liste. Le plateau que vous regardez n’est plus celui que vous regardiez un
          coup plus tôt.
        </p>

        <h2>S’entraîner sur papier</h2>
        <p>
          Ces techniques s’apprennent bien plus facilement sur une grille imprimée que sur un écran,
          car vous voyez toutes les annotations de candidats d’un coup et pouvez annoter librement.
          Imprimez un lot de grilles{' '}
          <Link href={L('/printable-sudoku/hard')}>difficiles</Link> à une ou deux par page pour avoir
          de la place pour écrire, et gardez le{' '}
          <Link href={L('/printable-sudoku-with-answers')}>corrigé</Link> pour vous vérifier une fois
          terminé. Chaque grille issue{' '}
          <Link href={L('/')}>du générateur</Link> est vérifiée pour n’avoir qu’une seule solution,
          donc si une technique vous mène à une contradiction, la faute vient des annotations au
          crayon, pas de la grille.
        </p>
      </>
    );
  }

  if (locale === 'es') {
    return (
      <>
        <p>
          Repasar la cuadrícula te lleva a través del sudoku fácil y buena parte del nivel medio. Más
          allá de eso ya no basta, y la cuadrícula se queda en silencio. Lo que sigue no es una lógica
          más difícil — es la misma lógica aplicada a las anotaciones de candidatos en vez de a los
          números. Estas son las técnicas que desatascan un tablero bloqueado, más o menos en el orden
          en que deberías recurrir a ellas.
        </p>
        <p>
          Todas suponen que has anotado los candidatos en las casillas vacías. Si no lo has hecho,
          hazlo primero; nada de lo que sigue se ve sin eso. Y si la anotación de candidatos es nueva
          para ti, empieza por{' '}
          <Link href={L('/guides/how-to-solve-sudoku')}>cómo resolver un sudoku</Link> y vuelve
          después.
        </p>

        <h2>1. Parejas, tríos y cuádruples simples</h2>
        <p>
          Una <strong>pareja simple</strong> son dos casillas de la misma zona — una fila, una columna
          o una región — que tienen exactamente los dos mismos candidatos. Si dos casillas de la fila
          4 muestran ambas {'{'}2, 8{'}'}, entonces una de ellas es el 2 y la otra el 8. Cuál sea cada
          una no importa. Lo que importa es que entre las dos han agotado el 2 y el 8 de la fila 4, así
          que en cualquier otra casilla de la fila 4 se pueden tachar el 2 y el 8.
        </p>
        <p>
          La misma idea se amplía. Tres casillas que comparten exactamente tres candidatos entre sí
          forman un trío simple, y cuatro casillas que comparten cuatro forman un cuádruple. Las
          casillas no necesitan tener cada una todos los candidatos — {'{'}2,8{'}'}, {'{'}2,5{'}'} y{' '}
          {'{'}5,8{'}'} repartidos en tres casillas forman un trío válido sobre 2, 5 y 8, porque esos
          tres números están confinados a esas tres casillas. Merece la pena buscar tríos; los
          cuádruples son lo bastante raros como para que normalmente encuentres antes otra cosa.
        </p>

        <h2>2. Parejas ocultas</h2>
        <p>
          Una pareja oculta es la misma situación disfrazada. Aquí, dos números solo pueden aparecer
          en dos casillas de una zona — pero esas casillas también llevan otros candidatos, así que
          la pareja no es evidente. Si en una región el 4 y el 9 aparecen ambos solo en las casillas A
          y B, entonces A y B tienen que ser el 4 y el 9 en algún orden, y cualquier otro candidato en
          A y B se puede eliminar.
        </p>
        <p>
          Las parejas ocultas son la técnica que menos aprovecha la mayoría de la gente, porque una
          pareja simple se anuncia a la vista y una oculta no. La forma de encontrarlas es recorrer
          una zona número por número, anotando qué casillas podría ocupar cada número, en vez de leer
          las casillas. Dos números con la misma huella de dos casillas son tu pareja.
        </p>

        <h2>3. Parejas apuntadoras y reducción caja-línea</h2>
        <p>
          Estas dos técnicas trabajan sobre la interacción entre una región y las filas o columnas que
          la atraviesan, y juntas son el motor del{' '}
          <Link href={L('/printable-sudoku/hard')}>sudoku difícil</Link>.
        </p>
        <p>
          Una <strong>pareja apuntadora</strong> trabaja de la región hacia fuera. Si, dentro de una
          región, todas las posiciones posibles para el 6 están en la misma fila, entonces el 6 de esa
          región está en algún punto de esa fila — no sabes dónde, pero sabes que está ahí. Eso
          significa que el 6 no puede estar en ningún otro sitio de esa fila fuera de la región.
          Táchalo de esas casillas.
        </p>
        <p>
          La <strong>reducción caja-línea</strong> es el mismo argumento al revés. Si todas las
          posiciones posibles para el 6 en una fila dada están dentro de una sola región, entonces el
          6 de esa región está en esa fila, y el 6 se puede tachar de las otras seis casillas de la
          región.
        </p>
        <p>
          Ambas son fáciles de aplicar en cuanto las buscas, y las dos suelen producir una cadena de
          efectos — las eliminaciones que generan suelen crear un único simple o un único oculto en
          uno o dos movimientos.
        </p>

        <h2>4. El X-wing</h2>
        <p>
          El X-wing es la primera técnica que abarca todo el tablero, y es el punto en el que la
          mayoría de la gente siente que el sudoku se convierte en un juego distinto.
        </p>
        <p>
          Busca un número — digamos el 7 — que en dos filas distintas solo pueda ir en dos casillas de
          cada una. Ahora comprueba las columnas: si en ambas filas esas dos casillas caen en el mismo
          par de columnas, tienes un X-wing. Las cuatro casillas forman un rectángulo. Caiga como
          caiga el 7, ocupa una casilla de cada fila y una de cada columna, sobre una diagonal de ese
          rectángulo. De cualquier forma, ambas columnas ya tienen su 7 cubierto dentro del rectángulo,
          así que el 7 se puede eliminar del resto de casillas de ambas columnas.
        </p>
        <p>
          Lo mismo funciona con los papeles invertidos: dos columnas con solo dos posiciones cada una,
          alineadas en las dos mismas filas, permiten eliminar en esas filas. Un X-wing rara vez
          resuelve una casilla directamente. Lo que hace es eliminar candidatos que bloqueaban una
          técnica más sencilla.
        </p>

        <h2>5. El swordfish y más allá</h2>
        <p>
          Un swordfish es un X-wing ampliado a tres filas y tres columnas: un número limitado a un
          máximo de tres casillas en cada una de tres filas, todas dentro de las mismas tres columnas,
          permite eliminar ese número del resto de esas columnas. Es realmente útil en{' '}
          <Link href={L('/printable-sudoku/expert')}>cuadrículas expertas</Link> y realmente difícil
          de detectar sin un repaso sistemático.
        </p>
        <p>
          Más allá están los XY-wing, los rectángulos únicos y las cadenas forzadas. Merece la pena
          aprenderlos si te gusta la caza, pero dan cada vez menos: la mayoría de los sudokus expertos
          caen con anotación de candidatos, parejas, parejas apuntadoras y un X-wing aplicado con
          paciencia. Recurrir a una cadena forzada suele ser señal de que se pasó algo más sencillo por
          alto.
        </p>

        <h2>Un orden de trabajo</h2>
        <p>Cuando una cuadrícula se atasca, repasa esta lista en vez de quedarte mirándola:</p>
        <ol>
          <li>Vuelve a buscar únicos simples y ocultos — probablemente hayas creado alguno desde tu última pasada.</li>
          <li>Repasa cada zona buscando parejas y tríos simples.</li>
          <li>Recorre cada zona número por número buscando parejas ocultas.</li>
          <li>Revisa cada región en busca de parejas apuntadoras, y luego cada fila y columna en busca de reducción caja-línea.</li>
          <li>Solo entonces empieza a buscar un X-wing.</li>
        </ol>
        <p>
          Cada paso alimenta a los anteriores, así que después de cualquier eliminación con éxito,
          vuelve al principio. El tablero que tienes delante ya no es el que tenías un movimiento
          antes.
        </p>

        <h2>Practica en papel</h2>
        <p>
          Estas técnicas se aprenden mucho más fácil en una cuadrícula impresa que en una pantalla,
          porque ves todas tus anotaciones de candidatos de una vez y puedes anotar con libertad.
          Imprime un lote de sudokus{' '}
          <Link href={L('/printable-sudoku/hard')}>difíciles</Link> a uno o dos por página para tener
          sitio donde escribir, y guarda las{' '}
          <Link href={L('/printable-sudoku-with-answers')}>soluciones</Link> para comprobarte tú mismo
          al terminar. Todos los sudokus de{' '}
          <Link href={L('/')}>el generador</Link> están verificados para tener exactamente una
          solución, así que si una técnica te lleva a una contradicción, el fallo está en las
          anotaciones a lápiz y no en el sudoku.
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        Scanning gets you through easy sudoku and most of the way through medium. Past that it runs
        out, and the grid goes quiet. What follows is not harder logic — it is the same logic
        applied to candidate marks instead of to digits. These are the techniques that unstick a
        stalled board, roughly in the order you should reach for them.
      </p>
      <p>
        All of them assume you have pencilled candidates into the empty cells. If you have not, do
        that first; none of what follows is visible without it. And if candidate marking itself is
        new, start with{' '}
        <Link href={L('/guides/how-to-solve-sudoku')}>how to solve sudoku</Link> and come back.
      </p>

      <h2>1. Naked pairs, triples and quads</h2>
      <p>
        A <strong>naked pair</strong> is two cells in the same region — a row, a column or a box —
        that hold exactly the same two candidates. If two cells in row 4 both read {'{'}2, 8{'}'},
        then one of them is the 2 and the other is the 8. Which is which does not matter. What
        matters is that between them they have used up row 4&rsquo;s 2 and its 8, so every other
        cell in row 4 can have 2 and 8 struck out.
      </p>
      <p>
        The same idea scales. Three cells sharing exactly three candidates between them form a
        naked triple, and four cells sharing four form a quad. The cells do not each need all the
        candidates — {'{'}2,8{'}'}, {'{'}2,5{'}'} and {'{'}5,8{'}'} across three cells is a valid
        triple on 2, 5 and 8, because those three digits are locked into those three cells. Triples
        are worth hunting for; quads are rare enough that you will usually find something else
        first.
      </p>

      <h2>2. Hidden pairs</h2>
      <p>
        A hidden pair is the same situation wearing a disguise. Here, two digits can only appear in
        two cells of a region — but those cells carry other candidates too, so the pair is not
        obvious. If in one box the 4 and the 9 both appear only in cells A and B, then A and B must
        be the 4 and the 9 in some order, and every other candidate in A and B can be deleted.
      </p>
      <p>
        Hidden pairs are the technique most solvers under-use, because a naked pair announces
        itself visually and a hidden one does not. The way to find them is to work digit by digit
        through a region, noting which cells each digit could occupy, rather than reading the cells.
        Two digits with the same two-cell footprint is your pair.
      </p>

      <h2>3. Pointing pairs and box-line reduction</h2>
      <p>
        These two work on the interaction between a box and the rows or columns crossing it, and
        together they are the workhorses of{' '}
        <Link href={L('/printable-sudoku/hard')}>hard sudoku</Link>.
      </p>
      <p>
        A <strong>pointing pair</strong> works outward from the box. If, inside one box, every
        possible position for the 6 lies in the same row, then the 6 for that box is somewhere in
        that row — you do not know where, but you know it is in there. Which means the 6 cannot be
        anywhere else in that row outside the box. Strike it out of those cells.
      </p>
      <p>
        <strong>Box-line reduction</strong> is the same argument in reverse. If every possible
        position for the 6 in a given row lies inside a single box, then that box&rsquo;s 6 is in
        that row, and the 6 can be struck from the box&rsquo;s other six cells.
      </p>
      <p>
        Both are easy to apply once you are looking for them, and both tend to produce a cascade —
        the eliminations they generate usually create a naked single or a hidden single within a
        move or two.
      </p>

      <h2>4. The X-wing</h2>
      <p>
        The X-wing is the first technique that spans the whole board, and it is the point where
        most solvers feel sudoku becomes a different game.
      </p>
      <p>
        Find a digit — say 7 — that in two different rows can only go in two cells each. Now check
        the columns: if in both rows those two cells sit in the same pair of columns, you have an
        X-wing. The four cells form a rectangle. Whichever way the 7s fall, they occupy one cell
        from each row and one from each column, taking a diagonal of that rectangle. Either way,
        both of those columns have their 7 accounted for inside the rectangle, so the 7 can be
        eliminated from every other cell in both columns.
      </p>
      <p>
        The same works with the roles swapped: two columns with only two positions each, aligned on
        the same two rows, eliminates from those rows. An X-wing rarely solves a cell directly.
        What it does is remove candidates that were blocking a simpler technique.
      </p>

      <h2>5. Swordfish and beyond</h2>
      <p>
        A swordfish is an X-wing widened to three rows and three columns: a digit confined to at
        most three cells in each of three rows, all falling within the same three columns,
        eliminates that digit from the rest of those columns. It is genuinely useful on{' '}
        <Link href={L('/printable-sudoku/expert')}>expert grids</Link> and genuinely hard to spot without
        a systematic sweep.
      </p>
      <p>
        Beyond that lie XY-wings, unique rectangles and forcing chains. They are worth learning if
        you enjoy the hunt, but they come with diminishing returns: most expert puzzles yield to
        candidate marking, pairs, pointing pairs and an X-wing applied patiently. Reaching for a
        forcing chain is usually a sign that something simpler was missed.
      </p>

      <h2>A working order</h2>
      <p>When a grid stalls, run down this list rather than staring:</p>
      <ol>
        <li>Re-scan for naked and hidden singles — you have probably created some since your last pass.</li>
        <li>Sweep every region for naked pairs and triples.</li>
        <li>Go digit by digit through each region looking for hidden pairs.</li>
        <li>Check every box for pointing pairs, then every row and column for box-line reduction.</li>
        <li>Only then start hunting for an X-wing.</li>
      </ol>
      <p>
        Each step feeds the ones above it, so after any successful elimination, go back to the top.
        The board you are looking at is not the board you were looking at a move ago.
      </p>

      <h2>Practise on paper</h2>
      <p>
        These techniques are far easier to learn on a printed grid than on a screen, because you can
        see every candidate mark at once and annotate freely. Print a batch of{' '}
        <Link href={L('/printable-sudoku/hard')}>hard</Link> puzzles one or two per page so there is room
        to write, and keep the{' '}
        <Link href={L('/printable-sudoku-with-answers')}>answer key</Link> to check yourself when you
        finish. Every puzzle from{' '}
        <Link href={L('/')}>the generator</Link> is verified to have exactly one solution, so if a
        technique leads you into a contradiction, the fault is in the pencil marks and not in the
        puzzle.
      </p>
    </>
  );
}
