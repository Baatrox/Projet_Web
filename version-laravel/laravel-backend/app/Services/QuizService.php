<?php

namespace App\Services;

/**
 * Quiz Service — côté serveur uniquement
 * Les bonnes réponses sont définies ici et ne sont jamais envoyées au frontend.
 * Le frontend envoie seulement les réponses de l'étudiant.
 * Le serveur recalcule la note et la sauvegarde.
 */
class QuizService
{
    const QUIZ_DATA = [
        1 => [
            'title' => 'Quiz 1 Javascript',
            'subtitle' => 'Tester vos Connaissances en javascript',
            'questions' => [
                [
                    'question' => 'Dans quel élément on met le code javascript ?',
                    'options' => [
                        ['label' => 'a', 'text' => '<script>'],
                        ['label' => 'b', 'text' => '<js>'],
                        ['label' => 'c', 'text' => '<body>'],
                        ['label' => 'd', 'text' => '<link>'],
                    ],
                    'correct' => 'a',
                ],
                [
                    'question' => 'Quel attribut utiliser pour faire référence à un script javascript externe ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'src'],
                        ['label' => 'b', 'text' => 'rel'],
                        ['label' => 'c', 'text' => 'type'],
                        ['label' => 'd', 'text' => 'href'],
                    ],
                    'correct' => 'a',
                ],
                [
                    'question' => 'Comment afficher "hello" sur un message alert ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'msg("hello")'],
                        ['label' => 'b', 'text' => 'alertbox("hello")'],
                        ['label' => 'c', 'text' => 'documentwrite("hello")'],
                        ['label' => 'd', 'text' => 'alert("hello")'],
                    ],
                    'correct' => 'd',
                ],
                [
                    'question' => 'Quelle est la syntaxe correcte pour créer une fonction en JavaScript ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'function = myFunction() {}'],
                        ['label' => 'b', 'text' => 'function myFunction() {}'],
                        ['label' => 'c', 'text' => 'function:myFunction() {}'],
                        ['label' => 'd', 'text' => 'func myFunction() {}'],
                    ],
                    'correct' => 'b',
                ],
                [
                    'question' => 'Comment appeler une fonction nommée "myFunction" ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'call myFunction()'],
                        ['label' => 'b', 'text' => 'myFunction()'],
                        ['label' => 'c', 'text' => 'invoke myFunction()'],
                        ['label' => 'd', 'text' => 'myFunction;'],
                    ],
                    'correct' => 'b',
                ],
                [
                    'question' => 'Comment accéder au premier élément d\'un tableau ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'myArray[0]'],
                        ['label' => 'b', 'text' => 'myArray.first()'],
                        ['label' => 'c', 'text' => 'myArray(1)'],
                        ['label' => 'd', 'text' => 'myArray[1]'],
                    ],
                    'correct' => 'a',
                ],
                [
                    'question' => 'Quel est le résultat de typeof "bonjour" ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'string'],
                        ['label' => 'b', 'text' => 'text'],
                        ['label' => 'c', 'text' => 'word'],
                        ['label' => 'd', 'text' => 'character'],
                    ],
                    'correct' => 'a',
                ],
                [
                    'question' => 'Comment créer un commentaire en JavaScript ?',
                    'options' => [
                        ['label' => 'a', 'text' => '# ceci est un commentaire'],
                        ['label' => 'b', 'text' => '// ceci est un commentaire'],
                        ['label' => 'c', 'text' => '<!-- ceci est un commentaire -->'],
                        ['label' => 'd', 'text' => '/* ceci est un commentaire'],
                    ],
                    'correct' => 'b',
                ],
                [
                    'question' => 'Quelle méthode convertit une chaîne en nombre entier ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'parseFloat()'],
                        ['label' => 'b', 'text' => 'parseInt()'],
                        ['label' => 'c', 'text' => 'toInteger()'],
                        ['label' => 'd', 'text' => 'Number()'],
                    ],
                    'correct' => 'b',
                ],
                [
                    'question' => 'Quel opérateur est utilisé pour assigner une valeur ?',
                    'options' => [
                        ['label' => 'a', 'text' => '=='],
                        ['label' => 'b', 'text' => '='],
                        ['label' => 'c', 'text' => '==='],
                        ['label' => 'd', 'text' => '!='],
                    ],
                    'correct' => 'b',
                ],
            ],
        ],
        2 => [
            'title' => 'Quiz 2 HTML/CSS',
            'subtitle' => 'Tester vos Connaissances en HTML et CSS',
            'questions' => [
                [
                    'question' => 'Quel est l\'élément HTML correct pour la plus grande heading ?',
                    'options' => [
                        ['label' => 'a', 'text' => '<heading>'],
                        ['label' => 'b', 'text' => '<h6>'],
                        ['label' => 'c', 'text' => '<h1>'],
                        ['label' => 'd', 'text' => '<head>'],
                    ],
                    'correct' => 'c',
                ],
                [
                    'question' => 'Comment créer un lien hypertexte en HTML ?',
                    'options' => [
                        ['label' => 'a', 'text' => '<link>URL</link>'],
                        ['label' => 'b', 'text' => '<a href="URL">Link text</a>'],
                        ['label' => 'c', 'text' => '<hyperlink href="URL"></hyperlink>'],
                        ['label' => 'd', 'text' => '<url>Link text</url>'],
                    ],
                    'correct' => 'b',
                ],
                [
                    'question' => 'Comment insérer une image en HTML ?',
                    'options' => [
                        ['label' => 'a', 'text' => '<image src="image.jpg">'],
                        ['label' => 'b', 'text' => '<img src="image.jpg">'],
                        ['label' => 'c', 'text' => '<picture src="image.jpg">'],
                        ['label' => 'd', 'text' => '<img href="image.jpg">'],
                    ],
                    'correct' => 'b',
                ],
                [
                    'question' => 'Quel attribut HTML est utilisé pour spécifier un ID unique ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'class'],
                        ['label' => 'b', 'text' => 'id'],
                        ['label' => 'c', 'text' => 'name'],
                        ['label' => 'd', 'text' => 'style'],
                    ],
                    'correct' => 'b',
                ],
                [
                    'question' => 'Comment ajouter du CSS à une page HTML ?',
                    'options' => [
                        ['label' => 'a', 'text' => '<css>body { color: red; }</css>'],
                        ['label' => 'b', 'text' => '<style> body { color: red; } </style>'],
                        ['label' => 'c', 'text' => '<script> body { color: red; } </script>'],
                        ['label' => 'd', 'text' => '<link> body { color: red; } </link>'],
                    ],
                    'correct' => 'b',
                ],
                [
                    'question' => 'Quelle propriété CSS est utilisée pour la couleur du texte ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'text-color'],
                        ['label' => 'b', 'text' => 'color'],
                        ['label' => 'c', 'text' => 'font-color'],
                        ['label' => 'd', 'text' => 'foreground-color'],
                    ],
                    'correct' => 'b',
                ],
                [
                    'question' => 'Comment sélectionner un élément avec l\'id "myid" en CSS ?',
                    'options' => [
                        ['label' => 'a', 'text' => '.myid {}'],
                        ['label' => 'b', 'text' => '#myid {}'],
                        ['label' => 'c', 'text' => 'myid {}'],
                        ['label' => 'd', 'text' => '*myid {}'],
                    ],
                    'correct' => 'b',
                ],
                [
                    'question' => 'Quel type d\'input HTML crée une case à cocher ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'input type="radio"'],
                        ['label' => 'b', 'text' => 'input type="text"'],
                        ['label' => 'c', 'text' => 'input type="checkbox"'],
                        ['label' => 'd', 'text' => 'input type="check"'],
                    ],
                    'correct' => 'c',
                ],
                [
                    'question' => 'Comment centrer un élément en CSS avec flexbox ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'align: center;'],
                        ['label' => 'b', 'text' => 'justify-content: center; align-items: center;'],
                        ['label' => 'c', 'text' => 'center: true;'],
                        ['label' => 'd', 'text' => 'position: center;'],
                    ],
                    'correct' => 'b',
                ],
                [
                    'question' => 'Quel est le sélecteur CSS pour tous les éléments ?',
                    'options' => [
                        ['label' => 'a', 'text' => 'all {}'],
                        ['label' => 'b', 'text' => '* {}'],
                        ['label' => 'c', 'text' => 'global {}'],
                        ['label' => 'd', 'text' => '[] {}'],
                    ],
                    'correct' => 'b',
                ],
            ],
        ],
    ];

    /**
     * Obtenir les questions d'un quiz (pour le frontend)
     * Retourne les questions SANS les bonnes réponses
     */
    public static function getQuizQuestions($quizNumber)
    {
        if (!isset(self::QUIZ_DATA[$quizNumber])) {
            return null;
        }

        $quiz = self::QUIZ_DATA[$quizNumber];

        return [
            'title' => $quiz['title'],
            'subtitle' => $quiz['subtitle'],
            'questions' => array_map(function ($q) {
                return [
                    'question' => $q['question'],
                    'options' => $q['options'],
                ];
            }, $quiz['questions']),
        ];
    }

    /**
     * Calculer le score à partir des réponses de l'étudiant
     * Le backend n'accepte que les réponses, pas une note pré-calculée
     */
    public static function calculateQuizScore($quizNumber, $studentAnswers)
    {
        if (!isset(self::QUIZ_DATA[$quizNumber])) {
            throw new \Exception('Quiz not found');
        }

        $quiz = self::QUIZ_DATA[$quizNumber];
        $correct = 0;

        foreach ($quiz['questions'] as $index => $question) {
            if (isset($studentAnswers[$index]) && $studentAnswers[$index] === $question['correct']) {
                $correct++;
            }
        }

        // Convertir en note sur 20
        $totalQuestions = count($quiz['questions']);
        $score = round(($correct / $totalQuestions) * 20);

        return [
            'correct' => $correct,
            'total' => $totalQuestions,
            'score' => min($score, 20), // Clamp à 20
        ];
    }
}
