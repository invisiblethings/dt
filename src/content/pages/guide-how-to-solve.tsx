import Link from 'next/link';
import { localizedPath, type Locale } from '@/i18n/config';

export function HowToSolveSudokuBody({ locale }: { locale: Locale }) {
  const L = (p: string) => localizedPath(locale, p);

  if (locale === 'de') {
    return (
      <>
        <p>
          Sudoku hat eine Regel, und alles andere folgt daraus: Jede der neun Zeilen, jede der neun
          Spalten und jeder der neun 3×3-Blöcke muss die Ziffern 1 bis 9 genau einmal enthalten. Das
          ist das ganze Spiel. Es gibt keine Arithmetik — die Ziffern könnten neun verschiedene
          Farben sein, und nichts würde sich ändern — und man muss nie raten. Ist ein Rätsel richtig
          gebaut, lässt sich jedes Feld aus dem herleiten, was bereits auf dem Brett steht.
        </p>
        <p>
          Was die meisten Einsteiger aufhält, ist nicht die Regel, sondern der erste Zug. Starrt man
          auf ein Raster mit fünfzig leeren Feldern, ist nicht klar, wo man anfangen soll zu suchen.
          Hier also eine Methode, die vom ersten Rätsel an funktioniert, das man in die Hand nimmt.
        </p>

        <h2>Beginne dort, wo das Raster am dichtesten ist</h2>
        <p>
          Fang nicht in der oberen linken Ecke an. Fang bei der Zeile, Spalte oder dem Block an, in
          dem schon die meisten Ziffern stehen. Ein Block, in dem sieben von neun Feldern gefüllt
          sind, hat nur zwei fehlende Ziffern, und es ist gut möglich, dass diese beiden nur auf eine
          Art angeordnet sein können. Das ist ein freies Feld, und freie Felder sind es, wodurch sich
          ein Raster öffnet.
        </p>
        <p>
          Durchsuche das Brett nach dem dichtesten Bereich und arbeite dich von dort nach außen.
          Jedes Feld, das du ausfüllst, schränkt seine Zeile, seine Spalte und seinen Block ein
          bisschen mehr ein — deshalb wird ein Sudoku im Verlauf schneller: die ersten zehn Felder
          sind die langsamen.
        </p>

        <h2>Die erste Technik: nach einer einzelnen Stelle suchen</h2>
        <p>
          Wähle eine Ziffer — 1 ist so gut wie jede andere. Finde jetzt einen 3×3-Block, der noch
          keine 1 enthält. Schau dir die drei Zeilen an, die durch diesen Block laufen. Taucht in
          einer dieser Zeilen bereits irgendwo eine 1 auf, kann kein Feld dieser Zeile innerhalb
          deines Blocks die 1 tragen. Schließe es aus. Mach dasselbe für die drei Spalten.
        </p>
        <p>
          Oft schließt du so alle Felder im Block bis auf eines aus. Dieses letzte Feld muss die 1
          sein, und du kannst sie mit Sicherheit eintragen. Das nennt sich Kreuzschraffur, und bei
          einem einfachen Rätsel bringt sie dich weit — manchmal bis zum Ende.
        </p>
        <p>
          Arbeite die Ziffern nacheinander durch, 1 bis 9, und beginne dann wieder bei 1. Jeder
          Durchgang füllt Felder, die den nächsten Durchgang ergiebiger machen. Zwei oder drei
          vollständige Durchgänge lösen die meisten{' '}
          <Link href={L('/printable-sudoku/easy')}>einfachen Sudoku-Raster zum Ausdrucken</Link>.
        </p>

        <h2>Die zweite Technik: das letzte verbliebene Feld</h2>
        <p>
          Der umgekehrte Blick ist genauso nützlich. Statt zu fragen „Wo kann diese Ziffer hin?“,
          wähle ein leeres Feld und frage „Was könnte hier hin?“. Schau entlang seiner Zeile, seiner
          Spalte und um seinen Block, und streiche jede Ziffer, die du dort siehst. Bleibt genau eine
          Ziffer übrig, ist das deine Antwort.
        </p>
        <p>
          Einsteiger neigen dazu, einen dieser beiden Blickwinkel zu bevorzugen und den anderen zu
          vergessen. Sie ergänzen sich: Kreuzschraffur findet Felder, die durch die Position einer
          Ziffer erzwungen werden, während diese Technik Felder findet, die durch alles um sie herum
          erzwungen werden. Stockt der eine, wechsle zum anderen, bevor du schließt, dass du
          feststeckst.
        </p>

        <h2>Wenn das Absuchen nicht mehr reicht: Bleistiftnotizen</h2>
        <p>
          Bei einem{' '}
          <Link href={L('/printable-sudoku/medium')}>mittelschweren Rätsel</Link> erreichst du einen
          Punkt, an dem keiner der beiden Blicke ein Feld liefert. Das ist keine Wand, sondern ein
          Signal, die Werkzeuge zu wechseln. Geh die leeren Felder durch und schreibe die möglichen
          Ziffern für jedes in kleinen Zahlen in die Ecke — Kandidaten, in der Sudoku-Sprache. Beim
          ersten Mal ist das mühsam und fühlt sich an wie Aufgeben. Ist es nicht: Es ist die Technik,
          um die herum die schwerere Hälfte des Rätsels aufgebaut ist.
        </p>
        <p>
          Mit Kandidaten auf dem Brett tauchen Muster auf, die man sonst nicht sieht. Das häufigste
          ist das <strong>offene Paar</strong>: zwei Felder in derselben Zeile, Spalte oder demselben
          Block, die beide genau dieselben zwei Kandidaten haben — sagen wir 3 und 7. Du weißt nicht,
          welches welche ist, aber du weißt, dass sie zusammen die 3 und die 7 für diesen Bereich
          verbrauchen. In jedem anderen Feld dieses Bereichs können 3 und 7 gestrichen werden. Diese
          Streichung führt meist zu einem gelösten Feld in der Nähe.
        </p>
        <p>
          Ihr Spiegelbild ist der <strong>versteckte Single</strong>: ein Kandidat, der nur in einem
          Feld eines Bereichs vorkommt, obwohl dieses Feld noch mehrere andere Kandidaten hat. Kann
          die 4 nur in ein Feld eines Blocks — dorthin gehört sie, egal was das Feld sonst noch
          enthielt. Versteckte Singles übersieht man leicht, gerade weil das Feld unentschieden
          aussieht.
        </p>

        <h2>Gewohnheiten, die verschwendete Abende verhindern</h2>
        <ul>
          <li>
            <strong>Benutze einen Bleistift.</strong> Nicht aus Unsicherheit — wegen der
            Kandidatennotizen. Ein Stift macht aus einem Raster ein Durcheinander, sobald du etwas
            ausschließt.
          </li>
          <li>
            <strong>Rate niemals.</strong> Hat ein Rätsel eine einzige Lösung — und das trifft auf
            jedes Rätsel dieser Website zu — gibt es immer einen logischen nächsten Zug. Ein falscher
            Ratewurf zeigt sich erst zwanzig Felder später, und ihn wieder rückgängig zu machen ist
            schlimmer als Steckenbleiben.
          </li>
          <li>
            <strong>Aktualisiere deine Kandidaten laufend.</strong> Der häufigste Grund für einen
            Widerspruch ist eine veraltete Bleistiftnotiz, die schon vor drei Zügen hätte gestrichen
            werden müssen.
          </li>
          <li>
            <strong>Leg es weg.</strong> Nach zehn Minuten Pause zu einem Raster zurückzukommen ist
            erstaunlich wirksam. Du hörst auf, das Muster zu sehen, von dem du überzeugt warst, und
            fängst an, das Brett zu sehen.
          </li>
        </ul>

        <h2>Wie man übt</h2>
        <p>
          Löse einfache Rätsel, bis du keine Kandidatennotizen mehr brauchst, um eines zu beenden.
          Wechsle dann zu mittelschwer und bleib dort, bis das Eintragen eines ganzen Rasters sich
          routiniert anfühlt statt mühsam. Erst dann lohnt sich{' '}
          <Link href={L('/printable-sudoku/hard')}>schwer</Link> — zu früh versucht, lehrt es eher
          Frust als Technik.
        </p>
        <p>
          Papier schlägt hier den Bildschirm. Auf einem gedruckten Raster siehst du alle deine
          Kandidatennotizen auf einmal, kritzelst, streichst und kommst morgen darauf zurück.{' '}
          <Link href={L('/')}>Drucke ein Set Rätsel</Link> auf der Stufe, an der du arbeitest — zwei
          pro Seite lassen viel Platz für Bleistiftnotizen — und schalte den Lösungsschlüssel ein,
          damit du ein fertiges Raster prüfen kannst, statt zu rätseln.
        </p>
        <p>
          Wenn einfach keine Herausforderung mehr ist, knüpft die{' '}
          <Link href={L('/guides/sudoku-solving-techniques')}>Anleitung zu Lösungstechniken</Link>{' '}
          hier an, mit zeigenden Paaren, Block-Zeilen-Reduktion und dem X-Wing.
        </p>
      </>
    );
  }

  if (locale === 'fr') {
    return (
      <>
        <p>
          Le sudoku a une seule règle, dont tout le reste découle : chacune des neuf lignes, chacune
          des neuf colonnes et chacun des neuf blocs 3×3 doit contenir les chiffres 1 à 9 exactement
          une fois. C’est tout le jeu. Il n’y a aucun calcul — les chiffres pourraient être neuf
          couleurs différentes, rien ne changerait — et il n’y a jamais besoin de deviner. Si une
          grille est correctement construite, chaque case peut se déduire de ce qui figure déjà sur
          le plateau.
        </p>
        <p>
          Ce qui bloque la plupart des débutants n’est pas la règle mais le premier coup. Face à une
          grille avec cinquante cases vides, on ne voit pas d’emblée où chercher. Voici donc une
          méthode qui fonctionne dès la première grille que vous prenez en main.
        </p>

        <h2>Commencez là où la grille est la plus remplie</h2>
        <p>
          Ne commencez pas par le coin en haut à gauche. Commencez par la ligne, la colonne ou le
          bloc qui contient déjà le plus de chiffres. Un bloc dont sept des neuf cases sont remplies
          n’a plus que deux chiffres manquants, et il y a de bonnes chances que ces deux-là ne
          puissent s’arranger que d’une seule façon. C’est une case libre, et ce sont les cases
          libres qui font s’ouvrir une grille.
        </p>
        <p>
          Balayez le plateau à la recherche de la zone la plus dense et progressez à partir de là.
          Chaque case que vous remplissez contraint un peu plus sa ligne, sa colonne et son bloc,
          c’est pourquoi un sudoku s’accélère au fil de sa résolution : les dix premières cases sont
          les plus lentes.
        </p>

        <h2>Première technique : le balayage à la recherche d’une case unique</h2>
        <p>
          Choisissez un chiffre — 1 convient aussi bien qu’un autre. Trouvez maintenant un bloc 3×3
          qui ne contient pas encore de 1. Regardez les trois lignes qui traversent ce bloc. Si un 1
          apparaît déjà quelque part dans l’une de ces lignes, alors aucune case de cette ligne à
          l’intérieur de votre bloc ne peut contenir le 1. Éliminez-la. Faites de même pour les trois
          colonnes.
        </p>
        <p>
          Vous éliminerez souvent toutes les cases du bloc sauf une. Cette dernière case doit
          contenir le 1, et vous pouvez l’inscrire avec certitude. On appelle cela le
          balayage croisé, et sur une grille facile, cela vous mènera loin — parfois jusqu’à la fin.
        </p>
        <p>
          Passez les chiffres en revue un par un, de 1 à 9, puis recommencez à 1. Chaque passage
          remplit des cases qui rendent le passage suivant plus productif. Deux ou trois passages
          complets suffisent à terminer la plupart des grilles de{' '}
          <Link href={L('/printable-sudoku/easy')}>sudoku facile à imprimer</Link>.
        </p>

        <h2>Deuxième technique : la dernière case possible</h2>
        <p>
          Le regard inverse est tout aussi utile. Au lieu de demander « où ce chiffre peut-il aller
          ? », choisissez une case vide et demandez « qu’est-ce qui pourrait aller ici ? ». Parcourez
          sa ligne, sa colonne et son bloc, et rayez chaque chiffre que vous y voyez. S’il n’en reste
          qu’un seul, c’est votre réponse.
        </p>
        <p>
          Les débutants ont tendance à privilégier l’une de ces deux approches et à oublier l’autre.
          Elles se complètent : le balayage croisé trouve les cases imposées par la position d’un
          chiffre, tandis que celle-ci trouve les cases imposées par tout ce qui les entoure. Quand
          l’une cale, passez à l’autre avant de conclure que vous êtes bloqué.
        </p>

        <h2>Quand le balayage ne suffit plus : les annotations au crayon</h2>
        <p>
          Sur une <Link href={L('/printable-sudoku/medium')}>grille de niveau moyen</Link>, vous
          atteindrez un point où aucune des deux approches ne donne de case. Ce n’est pas un mur,
          c’est un signal pour changer d’outil. Parcourez les cases vides et notez les chiffres
          possibles de chacune, en petits chiffres dans un coin — les candidats, dans le jargon du
          sudoku. C’est fastidieux la première fois et cela ressemble à un abandon. Ce n’en est pas
          un : c’est la technique autour de laquelle est construite la moitié la plus difficile du
          jeu.
        </p>
        <p>
          Avec les candidats notés, des motifs apparaissent que vous ne verriez pas autrement. Le
          plus courant est la <strong>paire nue</strong> : deux cases d’une même ligne, colonne ou
          d’un même bloc qui contiennent exactement les deux mêmes candidats — disons 3 et 7. Vous ne
          savez pas laquelle est laquelle, mais vous savez qu’à elles deux, elles épuisent le 3 et le
          7 pour cette zone. Vous pouvez rayer le 3 et le 7 de toutes les autres cases de cette zone.
          Cette élimination déclenche généralement la résolution d’une case à proximité.
        </p>
        <p>
          Son image miroir est le <strong>simple caché</strong> : un candidat qui n’apparaît que dans
          une seule case d’une zone, même si cette case comporte plusieurs autres candidats. Si le 4
          ne peut aller que dans une seule case d’un bloc, c’est là qu’il va — quels que soient les
          autres candidats de cette case. Les simples cachés sont faciles à manquer précisément parce
          que la case semble indécise.
        </p>

        <h2>Des habitudes pour éviter les soirées perdues</h2>
        <ul>
          <li>
            <strong>Utilisez un crayon.</strong> Pas par manque de confiance, mais pour les
            annotations de candidats. Un stylo transforme une grille en gâchis dès que vous éliminez
            quelque chose.
          </li>
          <li>
            <strong>Ne devinez jamais.</strong> Si une grille n’a qu’une seule solution — et c’est le
            cas de toutes celles de ce site — il existe toujours un coup logique suivant. Une
            supposition erronée ne se révélera que vingt cases plus loin, et la corriger est pire que
            d’être bloqué.
          </li>
          <li>
            <strong>Mettez vos candidats à jour au fur et à mesure.</strong> La cause la plus
            fréquente d’une contradiction est une annotation au crayon obsolète qui aurait dû être
            rayée trois coups plus tôt.
          </li>
          <li>
            <strong>Posez la grille.</strong> Y revenir après dix minutes d’absence est étonnamment
            efficace. Vous cessez de voir le motif dont vous étiez convaincu et commencez à voir le
            plateau.
          </li>
        </ul>

        <h2>Comment s’entraîner</h2>
        <p>
          Résolvez des grilles faciles jusqu’à ne plus avoir besoin de noter les candidats pour en
          terminer une. Passez ensuite au niveau moyen et restez-y jusqu’à ce qu’annoter une grille
          entière au crayon devienne une routine plutôt qu’une corvée. C’est seulement alors que le
          niveau <Link href={L('/printable-sudoku/hard')}>difficile</Link> vaut votre temps — tenté
          trop tôt, il enseigne surtout la frustration.
        </p>
        <p>
          Le papier l’emporte sur l’écran pour cela. Sur une grille imprimée, vous voyez toutes vos
          annotations d’un coup d’œil, vous griffonnez, vous rayez, et vous y revenez le lendemain.{' '}
          <Link href={L('/')}>Imprimez un lot de grilles</Link> au niveau où vous en êtes — deux par
          page laissent largement la place pour les annotations — et activez le corrigé pour vérifier
          une grille terminée au lieu de rester dans le doute.
        </p>
        <p>
          Quand le niveau facile cesse d’être un défi, le{' '}
          <Link href={L('/guides/sudoku-solving-techniques')}>guide des techniques de résolution</Link>{' '}
          prend le relais avec les paires pointantes, la réduction bloc-ligne et le X-wing.
        </p>
      </>
    );
  }

  if (locale === 'es') {
    return (
      <>
        <p>
          El sudoku tiene una regla, y todo lo demás se deriva de ella: cada una de las nueve filas,
          cada una de las nueve columnas y cada una de las nueve regiones 3×3 debe contener los
          números del 1 al 9 exactamente una vez. Eso es todo el juego. No hay aritmética — los
          números podrían ser nueve colores distintos y nada cambiaría — y nunca hace falta adivinar.
          Si un sudoku está bien construido, cada casilla se puede deducir de lo que ya hay en el
          tablero.
        </p>
        <p>
          Lo que frena a la mayoría de los principiantes no es la regla, sino el primer movimiento.
          Mirando fijamente una cuadrícula con cincuenta casillas vacías, no está claro por dónde
          empezar a buscar. Aquí va un método que funciona desde el primer sudoku que cojas.
        </p>

        <h2>Empieza donde la cuadrícula esté más llena</h2>
        <p>
          No empieces por la esquina superior izquierda. Empieza por la fila, columna o región que ya
          tenga más números. Una región con siete de sus nueve casillas rellenas solo tiene dos
          números que faltan, y hay bastantes posibilidades de que esos dos solo puedan colocarse de
          una manera. Eso es una casilla libre, y las casillas libres son lo que hace que una
          cuadrícula se abra.
        </p>
        <p>
          Repasa el tablero buscando la zona más densa y avanza hacia fuera desde ahí. Cada casilla
          que rellenas restringe un poco más su fila, su columna y su región, y por eso un sudoku va
          más rápido a medida que avanza: las primeras diez casillas son las lentas.
        </p>

        <h2>La primera técnica: buscar un único hueco</h2>
        <p>
          Elige un número — el 1 vale tanto como cualquier otro. Ahora encuentra una región 3×3 que
          todavía no tenga un 1. Mira las tres filas que atraviesan esa región. Si ya aparece un 1 en
          algún punto de una de esas filas, ninguna casilla de esa fila dentro de tu región puede
          tener el 1. Descártala. Haz lo mismo con las tres columnas.
        </p>
        <p>
          A menudo eliminarás todas las casillas de la región menos una. Esa última casilla tiene que
          ser el 1, y puedes escribirlo con total seguridad. Esto se llama barrido cruzado, y en un
          sudoku fácil te va a llevar muy lejos — a veces hasta el final.
        </p>
        <p>
          Repasa los números uno a uno, del 1 al 9, y luego empieza otra vez por el 1. Cada pasada
          rellena casillas que hacen la siguiente pasada más productiva. Dos o tres pasadas completas
          terminan la mayoría de las cuadrículas de{' '}
          <Link href={L('/printable-sudoku/easy')}>sudoku fácil para imprimir</Link>.
        </p>

        <h2>La segunda técnica: la última casilla que queda</h2>
        <p>
          El punto de vista inverso es igual de útil. En vez de preguntar «¿dónde puede ir este
          número?», elige una casilla vacía y pregunta «¿qué podría ir aquí?». Recorre su fila, su
          columna y su región, y tacha cada número que veas. Si sobrevive exactamente uno, esa es tu
          respuesta.
        </p>
        <p>
          Los principiantes tienden a preferir uno de estos dos enfoques y olvidarse del otro. Se
          complementan: el barrido cruzado encuentra casillas forzadas por la posición de un número,
          mientras que este encuentra casillas forzadas por todo lo que las rodea. Cuando uno se
          atasque, cambia al otro antes de concluir que estás bloqueado.
        </p>

        <h2>Cuando repasar la cuadrícula ya no basta: las anotaciones a lápiz</h2>
        <p>
          En un <Link href={L('/printable-sudoku/medium')}>sudoku de nivel medio</Link> llegarás a un
          punto en el que ninguno de los dos enfoques te da una casilla. Eso no es un muro, es una
          señal para cambiar de herramienta. Recorre las casillas vacías y escribe los números
          posibles de cada una en cifras pequeñas en la esquina — candidatos, en la jerga del sudoku.
          La primera vez resulta pesado y parece que te estás rindiendo. No lo es: es la técnica sobre
          la que se construye la mitad más difícil del juego.
        </p>
        <p>
          Con los candidatos anotados, aparecen patrones que de otra forma no verías. El más frecuente
          es la <strong>pareja simple</strong>: dos casillas de la misma fila, columna o región que
          tienen exactamente los mismos dos candidatos — digamos 3 y 7. No sabes cuál es cuál, pero
          sabes que entre las dos agotan el 3 y el 7 de esa zona. En cualquier otra casilla de esa
          zona se pueden tachar el 3 y el 7. Esa eliminación suele desencadenar una casilla resuelta
          cerca.
        </p>
        <p>
          Su imagen especular es el <strong>único oculto</strong>: un candidato que solo aparece en
          una casilla de una zona, aunque esa casilla tenga otros varios candidatos. Si el 4 solo
          puede ir en una casilla de una región, va ahí — sin importar qué más tuviera esa casilla.
          Los únicos ocultos son fáciles de pasar por alto precisamente porque la casilla parece
          indecisa.
        </p>

        <h2>Hábitos que evitan noches perdidas</h2>
        <ul>
          <li>
            <strong>Usa un lápiz.</strong> No por falta de confianza — por las anotaciones de
            candidatos. Un bolígrafo convierte una cuadrícula en un lío en cuanto descartas algo.
          </li>
          <li>
            <strong>Nunca adivines.</strong> Si un sudoku tiene una única solución — y eso es cierto
            en todos los de este sitio — siempre hay un siguiente movimiento lógico. Una suposición
            equivocada no se dejará ver hasta veinte casillas más tarde, y deshacerla es peor que
            estar atascado.
          </li>
          <li>
            <strong>Actualiza tus candidatos sobre la marcha.</strong> La causa más habitual de una
            contradicción es una anotación a lápiz anticuada que debería haberse tachado tres
            movimientos antes.
          </li>
          <li>
            <strong>Déjalo aparcado.</strong> Volver a una cuadrícula después de diez minutos fuera es
            sorprendentemente eficaz. Dejas de ver el patrón del que estabas convencido y empiezas a
            ver el tablero.
          </li>
        </ul>

        <h2>Cómo practicar</h2>
        <p>
          Resuelve sudokus fáciles hasta que ya no necesites anotar candidatos para terminar uno.
          Luego pasa al nivel medio y quédate ahí hasta que anotar una cuadrícula entera se sienta
          rutinario en vez de pesado. Solo entonces merece la pena el nivel{' '}
          <Link href={L('/printable-sudoku/hard')}>difícil</Link> — intentarlo demasiado pronto
          enseña más frustración que técnica.
        </p>
        <p>
          Para esto, el papel gana a la pantalla. En una cuadrícula impresa ves todas tus anotaciones
          de candidatos de golpe, garabateas, tachas y vuelves a ella mañana.{' '}
          <Link href={L('/')}>Imprime un set de sudokus</Link> del nivel en el que estás trabajando —
          dos por página dejan mucho sitio para las anotaciones a lápiz — y activa las soluciones para
          poder comprobar una cuadrícula terminada en vez de quedarte con la duda.
        </p>
        <p>
          Cuando el nivel fácil deje de ser un reto, la{' '}
          <Link href={L('/guides/sudoku-solving-techniques')}>guía de técnicas de resolución</Link>{' '}
          continúa a partir de aquí con las parejas apuntadoras, la reducción caja-línea y el X-wing.
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        Sudoku has one rule, and everything else follows from it: each of the nine rows, each of
        the nine columns, and each of the nine 3×3 boxes must contain the digits 1 to 9 exactly
        once. That is the whole game. There is no arithmetic — the digits could be nine different
        colours and nothing would change — and there is never a need to guess. If a puzzle is
        properly made, every cell can be worked out from what is already on the board.
      </p>
      <p>
        What stops most beginners is not the rule but the first move. Staring at a grid with fifty
        empty cells, it is not obvious where to start looking. So here is a method that works from
        the first puzzle you pick up.
      </p>

      <h2>Start where the grid is crowded</h2>
      <p>
        Do not start at the top-left corner. Start at whichever row, column or box already has the
        most digits in it. A box with seven of its nine cells filled has only two digits missing,
        and there is a decent chance those two can only go one way round. That is a free cell, and
        free cells are how a grid opens up.
      </p>
      <p>
        Scan the board for the densest region and work outward from it. Every cell you fill in
        makes its row, its column and its box that little bit more constrained, which is why a
        sudoku speeds up as it goes: the first ten cells are the slow ones.
      </p>

      <h2>The first technique: scanning for a single spot</h2>
      <p>
        Pick a digit — 1 is as good as any. Now find a 3×3 box that does not contain a 1 yet. Look
        at the three rows that pass through that box. If a 1 already appears somewhere in one of
        those rows, then no cell of that row inside your box can hold the 1. Rule it out. Do the
        same for the three columns.
      </p>
      <p>
        Often you will eliminate every cell in the box but one. That last cell must be the 1, and
        you can write it in with certainty. This is called cross-hatching, and on an easy puzzle it
        will carry you a long way — sometimes all the way to the end.
      </p>
      <p>
        Work through the digits one at a time, 1 through 9, then start again at 1. Each pass fills
        in cells that make the next pass more productive. Two or three complete passes will finish
        most{' '}
        <Link href={L('/printable-sudoku/easy')}>easy printable sudoku</Link> grids.
      </p>

      <h2>The second technique: the last cell standing</h2>
      <p>
        The reverse view is just as useful. Instead of asking &ldquo;where can this digit go?&rdquo;,
        pick an empty cell and ask &ldquo;what could go here?&rdquo; Look along its row, down its
        column, and around its box, and cross off every digit you see. If exactly one digit
        survives, that is your answer.
      </p>
      <p>
        Beginners tend to favour one of these two views and forget the other. They complement each
        other: cross-hatching finds cells that are forced by a digit&rsquo;s position, while this
        one finds cells that are forced by everything around them. When one stalls, switch to the
        other before you conclude you are stuck.
      </p>

      <h2>When scanning runs out: pencil marks</h2>
      <p>
        On a{' '}
        <Link href={L('/printable-sudoku/medium')}>medium puzzle</Link> you will reach a point where
        neither view yields a cell. That is not a wall, it is a signal to change tools. Go through
        the empty cells and write the possible digits for each one in small figures in the corner —
        candidates, in sudoku terms. It is tedious the first time and it feels like giving up. It
        is not: it is the technique the harder half of the puzzle is built around.
      </p>
      <p>
        With candidates on the board, patterns appear that you cannot see otherwise. The most
        common is the <strong>naked pair</strong>: two cells in the same row, column or box that
        both hold exactly the same two candidates — say 3 and 7. You do not know which is which,
        but you know that between them they use up both the 3 and the 7 for that region. Every
        other cell in that region can have 3 and 7 crossed off. That elimination usually cascades
        into a solved cell somewhere nearby.
      </p>
      <p>
        Its mirror image is the <strong>hidden single</strong>: a candidate that appears in only one
        cell of a region, even though that cell has several other candidates. If the 4 can only go
        in one cell of a box, it goes there — regardless of what else that cell might have held.
        Hidden singles are easy to miss precisely because the cell looks undecided.
      </p>

      <h2>Habits that prevent wasted evenings</h2>
      <ul>
        <li>
          <strong>Use a pencil.</strong> Not for lack of confidence — for the candidate marks. A pen
          turns a grid into a mess the moment you eliminate something.
        </li>
        <li>
          <strong>Never guess.</strong> If a puzzle has a single solution, and every puzzle from
          this site does, there is always a logical next move. A guess that turns out wrong will not
          announce itself for another twenty cells, and unpicking it is worse than being stuck.
        </li>
        <li>
          <strong>Update your candidates as you go.</strong> The most common cause of a contradiction
          is a stale pencil mark that should have been crossed off three moves ago.
        </li>
        <li>
          <strong>Put it down.</strong> Coming back to a grid after ten minutes away is startlingly
          effective. You stop seeing the pattern you were convinced was there and start seeing the
          board.
        </li>
      </ul>

      <h2>How to practise</h2>
      <p>
        Solve easy puzzles until you stop needing candidate marks to finish one. Then move to
        medium and stay there until pencilling in a whole grid feels routine rather than laborious.
        Only then is{' '}
        <Link href={L('/printable-sudoku/hard')}>hard</Link> worth your time — attempted too early it
        teaches frustration rather than technique.
      </p>
      <p>
        Paper beats a screen for this. On a printed grid you can see all your candidate marks at
        once, scribble, cross out, and come back to it tomorrow.{' '}
        <Link href={L('/')}>Print a set of puzzles</Link> at the level you are working on — two per page
        leaves plenty of room for pencil marks — and turn the answer key on so you can check a
        finished grid instead of wondering about it.
      </p>
      <p>
        When easy stops being a challenge, the{' '}
        <Link href={L('/guides/sudoku-solving-techniques')}>solving techniques guide</Link> picks up from
        here with pointing pairs, box-line reduction and the X-wing.
      </p>
    </>
  );
}
