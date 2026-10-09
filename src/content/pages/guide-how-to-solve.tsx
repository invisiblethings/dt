import Link from 'next/link';
import { localizedPath, type Locale } from '@/i18n/config';

export function HowToSolveSudokuBody({ locale }: { locale: Locale }) {
  const L = (p: string) => localizedPath(locale, p);

  if (locale === 'de') {
    return (
      <>
        <p>
          Sudoku hat eine Regel: Jede der neun Zeilen, neun Spalten und neun 3×3-Blöcke muss die
          Ziffern 1 bis 9 genau einmal enthalten. Das Rätsel kommt ohne Arithmetik aus, denn die
          Ziffern könnten neun Farben sein, ohne dass sich etwas ändert, und du musst nie raten. Bei
          einem gut gebauten Rätsel kannst du jedes Feld aus dem herleiten, was schon auf dem Brett
          steht.
        </p>
        <p>
          Die meisten Einsteiger bleiben beim ersten Zug hängen. Vor fünfzig leeren Feldern ist
          nicht klar, wo du mit der Suche anfangen sollst. Die folgende Methode funktioniert ab dem
          ersten Rätsel, das du in die Hand nimmst.
        </p>

        <h2>Beginne dort, wo das Raster am dichtesten ist</h2>
        <p>
          Lass die obere linke Ecke aus und beginne bei der Zeile, Spalte oder dem Block mit den
          meisten Ziffern. In einem Block mit sieben von neun ausgefüllten Feldern fehlen nur zwei
          Ziffern, und oft passen diese beiden nur auf eine Art. Das ergibt ein freies Feld, und
          freie Felder öffnen das Raster.
        </p>
        <p>
          Such das Brett nach dem dichtesten Bereich ab und arbeite dich von dort nach außen. Jedes
          Feld, das du ausfüllst, schränkt seine Zeile, Spalte und seinen Block ein wenig mehr ein,
          deshalb wird ein Sudoku mit der Zeit schneller. Die ersten zehn Felder dauern am längsten.
        </p>

        <h2>Die erste Technik: nach einer einzelnen Stelle suchen</h2>
        <p>
          Wähle eine Ziffer, etwa 1. Such einen 3×3-Block, der noch keine 1 enthält, und schau dir
          die drei Zeilen an, die durch ihn laufen. Steht in einer dieser Zeilen schon eine 1, kann
          kein Feld dieser Zeile in deinem Block die 1 aufnehmen, also schließe diese Felder aus.
          Mach dasselbe für die drei Spalten.
        </p>
        <p>
          Oft schließt du so alle Felder im Block bis auf eines aus. Dieses letzte Feld muss die 1
          enthalten, also trag sie ein. Löser nennen das Kreuzschraffur, und bei einem einfachen
          Rätsel kann sie dich bis zum Ende tragen.
        </p>
        <p>
          Arbeite die Ziffern nacheinander durch, 1 bis 9, und beginne dann wieder bei 1. Jeder
          Durchgang füllt Felder, die den nächsten Durchgang ergiebiger machen. Zwei oder drei
          vollständige Durchgänge lösen die meisten{' '}
          <Link href={L('/printable-sudoku/easy')}>einfachen Sudoku-Raster zum Ausdrucken</Link>.
        </p>

        <h2>Die zweite Technik: das letzte verbliebene Feld</h2>
        <p>
          Der umgekehrte Blick funktioniert genauso. Wähle ein leeres Feld und frage, welche Ziffern
          hineinpassen könnten. Schau entlang seiner Zeile, seiner Spalte und um seinen Block, und
          streiche jede Ziffer, die du dort siehst. Bleibt eine Ziffer übrig, trag sie ein.
        </p>
        <p>
          Einsteiger bevorzugen oft einen dieser Blickwinkel und vergessen den anderen.
          Kreuzschraffur findet Felder, die durch die Position einer Ziffer erzwungen werden; der
          Blick aufs letzte Feld findet Felder, die durch alles um sie herum erzwungen werden.
          Stockt der eine, wechsle zum anderen, bevor du entscheidest, dass du feststeckst.
        </p>

        <h2>Bleistiftnotizen, wenn das Absuchen stockt</h2>
        <p>
          Bei einem <Link href={L('/printable-sudoku/medium')}>mittelschweren Rätsel</Link>{' '}
          erreichst du einen Punkt, an dem keiner der beiden Blicke ein Feld liefert. Dann wechsle
          das Werkzeug. Geh die leeren Felder durch und schreibe die möglichen Ziffern jedes
          Feldes in kleinen Zahlen in die Ecke; Löser nennen sie Kandidaten. Beim ersten Mal fühlt
          sich das mühsam an, aber die schwerere Hälfte des Sudoku baut auf dieser Technik auf.
        </p>
        <p>
          Mit Kandidaten auf dem Brett siehst du Muster, die sonst verborgen bleiben. Das häufigste
          ist das <strong>offene Paar</strong>: zwei Felder in derselben Zeile, Spalte oder
          demselben Block mit denselben zwei Kandidaten, etwa 3 und 7. Du weißt nicht, welches Feld
          welche Ziffer bekommt, aber zusammen verbrauchen sie die 3 und die 7 dieses Bereichs, also
          kannst du 3 und 7 in den übrigen Feldern des Bereichs streichen. Diese Streichung löst oft
          ein Feld in der Nähe.
        </p>
        <p>
          Sein Spiegelbild ist der <strong>versteckte Single</strong>: ein Kandidat, der nur in
          einem Feld eines Bereichs vorkommt, obwohl dieses Feld noch mehrere andere Kandidaten hat.
          Passt die 4 nur in ein Feld eines Blocks, gehört sie dorthin, egal was das Feld sonst noch
          enthielt. Versteckte Singles übersiehst du leicht, weil das Feld unentschieden aussieht.
        </p>

        <h2>Gewohnheiten, die dir Zeit sparen</h2>
        <ul>
          <li>
            <strong>Benutze einen Bleistift.</strong> Du wirst viele Kandidatennotizen ausradieren,
            und ein Stift macht aus dem Raster ein Durcheinander.
          </li>
          <li>
            <strong>Rate nicht.</strong> Bei einem Rätsel mit einer einzigen Lösung, und das gilt für
            jedes Rätsel dieser Website, gibt es einen logischen nächsten Zug. Ein falscher Ratewurf
            kann sich zwanzig Felder lang verstecken, und ihn aufzudröseln kostet mehr als
            Steckenbleiben.
          </li>
          <li>
            <strong>Aktualisiere deine Kandidaten laufend.</strong> Widersprüche entstehen meist durch
            eine veraltete Bleistiftnotiz, die du drei Züge vorher hättest streichen sollen.
          </li>
          <li>
            <strong>Mach eine Pause.</strong> Nach zehn Minuten Abstand kommst du ohne das Muster
            zurück, auf das du dich versteift hattest, und siehst das Brett, wie es ist.
          </li>
        </ul>

        <h2>So übst du</h2>
        <p>
          Löse einfache Rätsel, bis du eines ohne Kandidatennotizen schaffst. Wechsle dann zu
          mittel und bleib dort, bis sich das Eintragen eines ganzen Rasters wie Routine anfühlt.
          Danach lohnen sich <Link href={L('/printable-sudoku/hard')}>schwere</Link> Rätsel;
          versuchst du sie zu früh, lernst du Frust statt Technik.
        </p>
        <p>
          Übe auf Papier. Auf einem gedruckten Raster siehst du alle Kandidatennotizen auf einmal,
          kritzelst, streichst und machst morgen weiter.{' '}
          <Link href={L('/')}>Drucke ein Set Rätsel</Link> auf deiner Stufe, zwei pro Seite für
          Platz zum Schreiben, und schalte den Lösungsschlüssel ein, damit du ein fertiges Raster
          prüfen kannst.
        </p>
        <p>
          Sobald dir einfache Rätsel zu leicht werden, geht die{' '}
          <Link href={L('/guides/sudoku-solving-techniques')}>Anleitung zu Lösungstechniken</Link>{' '}
          mit zeigenden Paaren, Block-Zeilen-Reduktion und dem X-Wing weiter.
        </p>
      </>
    );
  }

  if (locale === 'fr') {
    return (
      <>
        <p>
          Le sudoku a une seule règle : chacune des neuf lignes, des neuf colonnes et des neuf blocs
          3×3 doit contenir les chiffres 1 à 9 exactement une fois. Le jeu ne demande aucun calcul,
          puisque les chiffres pourraient être neuf couleurs sans que rien ne change, et vous n’avez
          jamais besoin de deviner. Sur une grille bien construite, vous pouvez déduire chaque case
          de ce qui figure déjà sur le plateau.
        </p>
        <p>
          La plupart des débutants bloquent sur le premier coup. Face à cinquante cases vides, rien
          n’indique où commencer à chercher. La méthode qui suit fonctionne dès la première grille
          que vous prenez en main.
        </p>

        <h2>Commencez là où la grille est la plus remplie</h2>
        <p>
          Laissez le coin en haut à gauche et commencez par la ligne, la colonne ou le bloc qui
          contient le plus de chiffres. Un bloc dont sept des neuf cases sont remplies n’a plus que
          deux chiffres manquants, et ces deux-là ne s’arrangent souvent que d’une seule façon. Cela
          vous donne une case libre, et les cases libres ouvrent la grille.
        </p>
        <p>
          Cherchez la zone la plus dense et progressez à partir de là. Chaque case remplie contraint
          un peu plus sa ligne, sa colonne et son bloc, si bien qu’un sudoku s’accélère au fil de la
          résolution. Les dix premières cases prennent le plus de temps.
        </p>

        <h2>Première technique : chercher la case unique</h2>
        <p>
          Choisissez un chiffre, par exemple 1. Trouvez un bloc 3×3 qui ne contient pas encore de 1
          et regardez les trois lignes qui le traversent. Si un 1 figure déjà dans l’une de ces
          lignes, aucune case de cette ligne dans votre bloc ne peut contenir le 1 : éliminez-les.
          Faites de même pour les trois colonnes.
        </p>
        <p>
          Vous éliminerez souvent toutes les cases du bloc sauf une. Cette dernière case doit
          contenir le 1, alors inscrivez-le. Les joueurs appellent cela le balayage croisé, et sur
          une grille facile, il peut vous mener jusqu’au bout.
        </p>
        <p>
          Passez les chiffres en revue un par un, de 1 à 9, puis recommencez à 1. Chaque passage
          remplit des cases qui rendent le suivant plus productif. Deux ou trois passages complets
          suffisent à terminer la plupart des grilles de{' '}
          <Link href={L('/printable-sudoku/easy')}>sudoku facile à imprimer</Link>.
        </p>

        <h2>Deuxième technique : la dernière case possible</h2>
        <p>
          Le regard inverse marche tout aussi bien. Choisissez une case vide et demandez-vous quels
          chiffres pourraient y aller. Parcourez sa ligne, sa colonne et son bloc, et rayez chaque
          chiffre que vous y voyez. S’il n’en reste qu’un, inscrivez-le.
        </p>
        <p>
          Les débutants privilégient souvent une approche et oublient l’autre. Le balayage croisé
          trouve les cases imposées par la position d’un chiffre ; la dernière case possible trouve
          celles imposées par tout ce qui les entoure. Quand l’une cale, passez à l’autre avant de
          conclure que vous êtes bloqué.
        </p>

        <h2>Les annotations au crayon, quand le balayage cale</h2>
        <p>
          Sur une <Link href={L('/printable-sudoku/medium')}>grille de niveau moyen</Link>, vous
          atteindrez un point où aucune des deux approches ne donne de case. À ce moment-là,
          changez d’outil. Parcourez les cases vides et notez les chiffres possibles de chacune en
          petits chiffres dans un coin ; les joueurs les appellent des candidats. La première
          fois, c’est fastidieux, mais toute la moitié difficile du sudoku repose sur cette
          technique.
        </p>
        <p>
          Avec les candidats notés, vous voyez des motifs qui restent cachés autrement. Le plus
          courant est la <strong>paire nue</strong> : deux cases d’une même ligne, colonne ou d’un
          même bloc qui contiennent les deux mêmes candidats, disons 3 et 7. Vous ne savez pas
          quelle case reçoit quel chiffre, mais à elles deux elles épuisent le 3 et le 7 de cette
          zone : vous pouvez donc rayer 3 et 7 des autres cases de la zone. Cette élimination résout
          souvent une case voisine.
        </p>
        <p>
          Son image miroir est le <strong>simple caché</strong> : un candidat qui n’apparaît que
          dans une seule case d’une zone, même si cette case comporte plusieurs autres candidats. Si
          le 4 ne peut aller que dans une seule case d’un bloc, il va là, quels que soient les
          autres candidats de la case. Vous pouvez manquer un simple caché parce que la case semble
          indécise.
        </p>

        <h2>Des habitudes qui vous font gagner du temps</h2>
        <ul>
          <li>
            <strong>Utilisez un crayon.</strong> Vous effacerez beaucoup d’annotations, et un stylo
            transforme la grille en gâchis.
          </li>
          <li>
            <strong>Ne devinez pas.</strong> Sur une grille à solution unique, ce qui vaut pour toutes
            celles de ce site, il existe un coup logique suivant. Une supposition erronée peut rester
            cachée vingt cases durant, et la défaire coûte plus cher que de rester bloqué.
          </li>
          <li>
            <strong>Mettez vos candidats à jour au fur et à mesure.</strong> Les contradictions
            viennent le plus souvent d’une annotation obsolète que vous auriez dû rayer trois coups
            plus tôt.
          </li>
          <li>
            <strong>Faites une pause.</strong> Après dix minutes d’absence, vous revenez sans le motif
            sur lequel vous vous étiez fixé, et vous voyez le plateau tel qu’il est.
          </li>
        </ul>

        <h2>Comment s’entraîner</h2>
        <p>
          Résolvez des grilles faciles jusqu’à en terminer une sans annoter les candidats. Passez
          ensuite au niveau moyen et restez-y jusqu’à ce qu’annoter une grille entière devienne
          une routine. Ensuite, le niveau{' '}
          <Link href={L('/printable-sudoku/hard')}>difficile</Link> vaut votre temps ; tenté trop
          tôt, il enseigne la frustration plutôt que la technique.
        </p>
        <p>
          Entraînez-vous sur papier. Sur une grille imprimée, vous voyez toutes vos annotations
          d’un coup, vous griffonnez, vous rayez et vous y revenez le lendemain.{' '}
          <Link href={L('/')}>Imprimez un lot de grilles</Link> à votre niveau, deux par page pour
          avoir de la place, et activez le corrigé pour vérifier une grille terminée.
        </p>
        <p>
          Quand les grilles faciles vous paraissent trop simples, le{' '}
          <Link href={L('/guides/sudoku-solving-techniques')}>guide des techniques de résolution</Link>{' '}
          continue avec les paires pointantes, la réduction bloc-ligne et le X-wing.
        </p>
      </>
    );
  }

  if (locale === 'es') {
    return (
      <>
        <p>
          El sudoku tiene una regla: cada una de las nueve filas, nueve columnas y nueve regiones
          3×3 debe contener los números del 1 al 9 exactamente una vez. El juego no lleva
          aritmética, porque los números podrían ser nueve colores y nada cambiaría, y nunca
          necesitas adivinar. En un sudoku bien construido puedes deducir cada casilla de lo que ya
          hay en el tablero.
        </p>
        <p>
          La mayoría de los principiantes se atasca en el primer movimiento. Ante cincuenta casillas
          vacías, no está claro por dónde empezar a buscar. El método que sigue funciona desde el
          primer sudoku que cojas.
        </p>

        <h2>Empieza donde la cuadrícula esté más llena</h2>
        <p>
          Olvida la esquina superior izquierda y empieza por la fila, columna o región con más
          números. A una región con siete de sus nueve casillas rellenas solo le faltan dos números,
          y a menudo esos dos solo encajan de una manera. Eso te da una casilla libre, y las
          casillas libres abren la cuadrícula.
        </p>
        <p>
          Busca la zona más densa del tablero y avanza desde ahí. Cada casilla que rellenas
          restringe un poco más su fila, su columna y su región, así que un sudoku se acelera a
          medida que avanzas. Las primeras diez casillas son las que más cuestan.
        </p>

        <h2>La primera técnica: buscar un único hueco</h2>
        <p>
          Elige un número, por ejemplo el 1. Busca una región 3×3 que aún no tenga un 1 y mira las
          tres filas que la atraviesan. Si ya hay un 1 en una de esas filas, ninguna casilla de esa
          fila dentro de tu región puede llevar el 1, así que descártalas. Haz lo mismo con las tres
          columnas.
        </p>
        <p>
          A menudo descartarás todas las casillas de la región menos una. Esa última casilla tiene
          que llevar el 1, así que escríbelo. Quienes resuelven sudokus lo llaman barrido cruzado, y
          en un sudoku fácil puede llevarte hasta el final.
        </p>
        <p>
          Repasa los números uno a uno, del 1 al 9, y luego empieza otra vez por el 1. Cada pasada
          rellena casillas que hacen más productiva la siguiente. Dos o tres pasadas completas
          terminan la mayoría de las cuadrículas de{' '}
          <Link href={L('/printable-sudoku/easy')}>sudoku fácil para imprimir</Link>.
        </p>

        <h2>La segunda técnica: la última casilla que queda</h2>
        <p>
          El punto de vista inverso funciona igual de bien. Elige una casilla vacía y pregúntate qué
          números podrían ir en ella. Recorre su fila, su columna y su región, y tacha cada número
          que veas. Si queda uno, escríbelo.
        </p>
        <p>
          Los principiantes suelen preferir un enfoque y olvidar el otro. El barrido cruzado
          encuentra casillas forzadas por la posición de un número; la última casilla encuentra
          casillas forzadas por todo lo que las rodea. Cuando uno se atasque, cambia al otro antes
          de decidir que estás bloqueado.
        </p>

        <h2>Anotaciones a lápiz, para cuando repasar se atasca</h2>
        <p>
          En un <Link href={L('/printable-sudoku/medium')}>sudoku de nivel medio</Link> llegarás a
          un punto en que ninguno de los dos enfoques te da una casilla. Entonces, cambia de
          herramienta. Recorre las casillas vacías y escribe los números posibles de cada una en
          cifras pequeñas en la esquina; quienes resuelven sudokus los llaman candidatos. La
          primera vez resulta pesado, pero la mitad más difícil del sudoku se apoya en esta
          técnica.
        </p>
        <p>
          Con los candidatos anotados, ves patrones que de otra forma quedan ocultos. El más
          frecuente es la <strong>pareja simple</strong>: dos casillas de la misma fila, columna o
          región con los mismos dos candidatos, por ejemplo 3 y 7. No sabes qué casilla lleva cada
          número, pero entre las dos agotan el 3 y el 7 de esa zona, así que puedes tachar el 3 y el
          7 del resto de casillas de la zona. Esa eliminación suele resolver una casilla cercana.
        </p>
        <p>
          Su imagen especular es el <strong>único oculto</strong>: un candidato que solo aparece en
          una casilla de una zona, aunque esa casilla tenga varios candidatos más. Si el 4 solo cabe
          en una casilla de una región, va ahí, tuviera lo que tuviera esa casilla. Se te puede
          escapar un único oculto porque la casilla parece indecisa.
        </p>

        <h2>Hábitos que te ahorran tiempo</h2>
        <ul>
          <li>
            <strong>Usa un lápiz.</strong> Vas a borrar muchas anotaciones de candidatos, y un
            bolígrafo convierte la cuadrícula en un lío.
          </li>
          <li>
            <strong>No adivines.</strong> En un sudoku con una única solución, como todos los de este
            sitio, existe un siguiente movimiento lógico. Una suposición equivocada puede esconderse
            veinte casillas, y deshacerla cuesta más que estar atascado.
          </li>
          <li>
            <strong>Actualiza tus candidatos sobre la marcha.</strong> Las contradicciones suelen
            venir de una anotación a lápiz anticuada que deberías haber tachado tres movimientos
            antes.
          </li>
          <li>
            <strong>Haz una pausa.</strong> Tras diez minutos fuera, vuelves a la cuadrícula sin el
            patrón en el que te habías empeñado, y ves el tablero tal como es.
          </li>
        </ul>

        <h2>Cómo practicar</h2>
        <p>
          Resuelve sudokus fáciles hasta que termines uno sin anotar candidatos. Luego pasa al
          nivel medio y quédate ahí hasta que anotar una cuadrícula entera te resulte rutinario.
          Después, el nivel <Link href={L('/printable-sudoku/hard')}>difícil</Link> merece la
          pena; si lo intentas demasiado pronto, aprendes frustración en vez de técnica.
        </p>
        <p>
          Practica en papel. En una cuadrícula impresa ves todas tus anotaciones de golpe,
          garabateas, tachas y vuelves a ella mañana.{' '}
          <Link href={L('/')}>Imprime un set de sudokus</Link> de tu nivel, dos por página para
          tener sitio donde escribir, y activa las soluciones para comprobar una cuadrícula
          terminada.
        </p>
        <p>
          Cuando los sudokus fáciles se te queden cortos, la{' '}
          <Link href={L('/guides/sudoku-solving-techniques')}>guía de técnicas de resolución</Link>{' '}
          continúa con las parejas apuntadoras, la reducción caja-línea y el X-wing.
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        Sudoku has one rule: each of the nine rows, nine columns and nine 3×3 boxes must contain the
        digits 1 to 9 exactly once. The puzzle involves no arithmetic, since the digits could be
        nine colours and nothing would change, and you never need to guess. On a well-made puzzle
        you can work out each cell from what is already on the board.
      </p>
      <p>
        Most beginners get stuck on the first move. Faced with fifty empty cells, you have no
        obvious place to start looking. The method below works from the first puzzle you pick up.
      </p>

      <h2>Start where the grid is crowded</h2>
      <p>
        Skip the top-left corner and start at the row, column or box with the most digits already in
        it. A box with seven of its nine cells filled is missing only two digits, and those two
        often fit only one way round. That gives you a free cell, and free cells open up the grid.
      </p>
      <p>
        Scan the board for the densest region and work outward from it. Each cell you fill in
        constrains its row, column and box a little more, so a sudoku speeds up as you go. The first
        ten cells take the longest.
      </p>

      <h2>The first technique: scanning for a single spot</h2>
      <p>
        Pick a digit, say 1. Find a 3×3 box that does not contain a 1 yet, and look at the three
        rows that pass through it. If a 1 already appears in one of those rows, no cell of that row
        inside your box can hold the 1, so rule those cells out. Do the same for the three columns.
      </p>
      <p>
        Often you will eliminate all but one cell in the box. That last cell must hold the 1, so
        write it in. Solvers call this cross-hatching, and on an easy puzzle it can carry you to the
        end.
      </p>
      <p>
        Work through the digits one at a time, 1 through 9, then start again at 1. Each pass
        fills cells that make the next pass more productive. Two or three complete passes will
        finish most <Link href={L('/printable-sudoku/easy')}>easy printable sudoku</Link> grids.
      </p>

      <h2>The second technique: the last cell standing</h2>
      <p>
        The reverse view works as well. Pick an empty cell and ask which digits could go in it. Look
        along its row, down its column and around its box, and cross off each digit you see. If one
        digit survives, write it in.
      </p>
      <p>
        Beginners tend to favour one of these views and forget the other. Cross-hatching finds cells
        forced by one digit&rsquo;s position; the last-cell check finds cells forced by everything
        around them. When one stalls, switch to the other before you decide you are stuck.
      </p>

      <h2>Pencil marks, for when scanning stalls</h2>
      <p>
        On a <Link href={L('/printable-sudoku/medium')}>medium puzzle</Link> you will reach a
        point where neither view yields a cell. At that point, change tools. Go through the
        empty cells and write the possible digits for each in small figures in the corner;
        solvers call these candidates. The first time it feels tedious, but the harder half of
        sudoku depends on this technique.
      </p>
      <p>
        With candidates on the board, you can see patterns that stay hidden otherwise. The most
        common is the <strong>naked pair</strong>: two cells in the same row, column or box that
        hold the same two candidates, say 3 and 7. You do not know which cell gets which digit, but
        between them they use up the 3 and the 7 for that region, so you can cross 3 and 7 off the
        region&rsquo;s other cells. That elimination often solves a nearby cell.
      </p>
      <p>
        Its mirror image is the <strong>hidden single</strong>: a candidate that appears in only one
        cell of a region, even though that cell has several other candidates. If the 4 fits only one
        cell of a box, it goes there, whatever else that cell might have held. You can miss hidden
        singles because the cell looks undecided.
      </p>

      <h2>Habits that save you time</h2>
      <ul>
        <li>
          <strong>Use a pencil.</strong> You will erase a lot of candidate marks, and a pen turns
          the grid into a mess.
        </li>
        <li>
          <strong>Do not guess.</strong> On a puzzle with a single solution, which covers each
          puzzle from this site, a logical next move exists. A wrong guess can hide for twenty
          cells, and unpicking it costs more than being stuck.
        </li>
        <li>
          <strong>Update your candidates as you go.</strong> Contradictions usually come from a
          stale pencil mark you should have crossed off three moves earlier.
        </li>
        <li>
          <strong>Take a break.</strong> After ten minutes away, you come back to the grid without
          the pattern you had fixed on, and you see the board as it is.
        </li>
      </ul>

      <h2>How to practise</h2>
      <p>
        Solve easy puzzles until you can finish one without candidate marks. Then move to medium
        and stay there until pencilling in a whole grid feels routine. After that,{' '}
        <Link href={L('/printable-sudoku/hard')}>hard</Link> puzzles are worth your time; if you
        try them too early, you learn frustration instead of technique.
      </p>
      <p>
        Practise on paper. On a printed grid you can see all your candidate marks at once,
        scribble, cross out and come back tomorrow.{' '}
        <Link href={L('/')}>Print a set of puzzles</Link> at your level, two per page for room
        to write, and turn on the answer key so you can check a finished grid.
      </p>
      <p>
        Once easy puzzles feel too simple, the{' '}
        <Link href={L('/guides/sudoku-solving-techniques')}>solving techniques guide</Link>{' '}
        continues with pointing pairs, box-line reduction and the X-wing.
      </p>
    </>
  );
}
