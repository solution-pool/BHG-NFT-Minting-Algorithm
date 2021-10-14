<?php

// for($i = 1; $i < 2134; $i ++) {
//     // for($j = 1; $j < 10 ; $j ++) {
//         fopen("config_unusual_".($i).'.js', 'wb');
//         copy('config_unusual_0.js',
//             "config_unusual_".($i).'.js'
//         );
//     // }
// }
// $file = file('index_1.html');                                                                                                                

// echo '<pre>';
// foreach($file as $one) {
//     echo htmlspecialchars($one);
// }
// print_r($file);
// exit;

// for($i = 1; $i < 89; $i ++) {
//     rename("config_special_".$i.".js", "config_exo_".$i.".js");
// }

for($i = 1; $i < 268; $i ++) {
    $file = file('config_exo_'.$i.'.js');
    $file_replace_content = [];
    foreach($file as $per_line) {
        // if(strpos($per_line, 'const NMAX') !== false) {
        //     $file_replace_content[] = 'const NMAX          = 10 ** 5';
        //     $file_replace_content[] = "\n";
        // }
        // if(strpos($per_line, 'const INDEX') !== false) {
        //     $file_replace_content[] = 'const INDEX         = '.$i;
        //     $file_replace_content[] = "\n";
        // }
        // if(strpos($per_line, '  <script src="config_rare') !== false) {
        //     $file_replace_content[] = '  <script src="config_rare_'.$i.'.js"></script>';
        //     $file_replace_content[] = "\n";
        // }
        // if(strpos($per_line, '  <title>Coral Exo ') !== false) {
        //     $file_replace_content[] = '  <title>Coral Exo '.$i.'</title>';
        //     $file_replace_content[] = "\n";
        // }
        // elseif(strpos($per_line, '  <script src="unique.js"></script>') !== false) {
        //     $file_replace_content[] = '  <script src="ones.js"></script>';
        //     $file_replace_content[] = "\n";
        // }
        // elseif(strpos($per_line, 'const FARL') !== false) {
        //     $file_replace_content[] = 'const FARL          = 30 * ONE';
        //     $file_replace_content[] = "\n";
        // }
        // elseif(strpos($per_line, 'const SIZE') !== false) {
        //     $file_replace_content[] = 'const SIZE          = 1200       // Growth size';
        //     $file_replace_content[] = "\n";
        // }
        // elseif(strpos($per_line, 'const RYTHM') !== false) {
        //     $file_replace_content[] = 'const RYTHM         = '.rand(2, 9).'         // Growth RYTHM';
        //     $file_replace_content[] = "\n";
        // }
        // elseif(strpos($per_line, 'const COLOROPTION') !== false) {
        //     $file_replace_content[] = 'const COLOROPTION   = '.rand(1, 9).'         // Coloroption';
        //     $file_replace_content[] = "\n";
        // }
        // if(strpos($per_line, 'let index_number = ') !== false) {
        //     // $file_replace_content[] = 'const BACK  = color['.($i % 200).']';
        //     // $file_replace_content[] = "\n";
        //     // $file_replace_content[] = 'const FRONT = [255, 255, 255]';
        //     // $file_replace_content[] = "\n";
        //     $file_replace_content[] = 'let index_number = '.$i;
        //     // $file_replace_content[] = "\n";
        //     // continue;
        // }
        // if(strpos($per_line, 'const BACK  ') !== false) {
        //     $file_replace_content[] = 'const BACK  = color['.$i.']';
        //     $file_replace_content[] = "\n";
        //     $file_replace_content[] = 'let index_number = '.$i;
        //     $file_replace_content[] = "\n";
        // }
        // if(strpos($per_line, '  </style>') !== false) {
        //     $file_replace_content[] = '  </style>';
        //     $file_replace_content[] = "\n";
        //     $file_replace_content[] = '<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/2.3.10/seedrandom.min.js"></script>';
        //     $file_replace_content[] = "\n";
        // } 
        // if(strpos($per_line, 'const NEAR') !== false) {
        //     $file_replace_content[] = 'const NEARL         = 5 * ONE';
        //     $file_replace_content[] = "\n";
        // }
        // elseif(strpos($per_line, 'const FARL') !== false) {
        //     $file_replace_content[] = 'const FARL          = 30 * ONE';
        //     $file_replace_content[] = "\n";
        // }
        // elseif(strpos($per_line, 'const INIT_RAD') !== false) {
        //     $file_replace_content[] = 'const INIT_RAD      = '.rand(3 , 8).' * ONE';
        //     $file_replace_content[] = "\n";
        // }
        if(strpos($per_line, 'const INIT_NUM') !== false) {
            $file_replace_content[] = 'const INIT_NUM      = '.rand(5, 12);
            $file_replace_content[] = "\n";
        }

        // if(strpos($per_line, 'const STP') !== false) {
        //     // continue;
        //     $file_replace_content[] = 'const STP   = ONE';
        //     $file_replace_content[] = "\n";
        //     $file_replace_content[] = 'const NEARL = 5 * ONE';
        //     $file_replace_content[] = "\n";
        //     $file_replace_content[] = 'const FARL  = 30 * ONE';
        //     $file_replace_content[] = "\n";
        // }

        // if(strpos($per_line, 'const ONE') !== false) {
        //     $file_replace_content[] = 'const ONE   = 1 / REALSIZE';
        //     $file_replace_content[] = "\n";
        //     $file_replace_content[] = "\n";
        //     $file_replace_content[] = 'const STP   = ONE';
        //     $file_replace_content[] = "\n";
        // }
        // // // // //  else {
        // // // // //     $file_replace_content[] = $per_line;
        // // // // // }
        // elseif(strpos($per_line, 'const BACK') !== false) {
        //     $file_replace_content[] = 'const BACK  = [0,0,0]';
        //     // $file_replace_content[] = 'const BACK  = color['.($i % 42).']';
        //     $file_replace_content[] = "\n";
            
        //     // $file_replace_content[] = 'let index_number = '.$i;
        //     // $file_replace_content[] = "\n";
        // }    
        // elseif(strpos($per_line, 'const FRONT') !== false) {
        //     // $file_replace_content[] = 'const FRONT = color['.($i % 42).']';
        //     $file_replace_content[] = 'const FRONT = [color['.($i % 42).'], color['.(($i + 14) % 42).'], color['.(($i + 28) % 42).']]';
        //     $file_replace_content[] = "\n";
        // }
        // elseif(strpos($per_line, 'const INIT_RAD') !== false) {
        //     $file_replace_content[] = 'const INIT_RAD  =  1 * ONE';
        //     $file_replace_content[] = "\n";
        // }
        // elseif(strpos($per_line, 'const INIT_NUM  ') !== false) {
        //     // $file_replace_content[] = $per_line;
        //     // $file_replace_content[] = "\n";
        //     $file_replace_content[] = 'const INIT_NUM  = 20';
        //     $file_replace_content[] = "\n";
        // } 
        // elseif(strpos($per_line, 'const FRONT ') !== false) {
        //     $file_replace_content[] = 'const FRONT = color['.($i % 200).']';
        //     $file_replace_content[] = "\n";
        // }
//         if(strpos($per_line, 'let index_number') !== false) {
//             $file_replace_content[] = 'let index_number = '.$i;
//             $file_replace_content[] = "\n";
//             $file_replace_content[] = 'const colorCount = 1';
//         }
        else {
            $file_replace_content[] = $per_line;
        }
    }

    file_put_contents('config_exo_'.$i.'.js', $file_replace_content);
}