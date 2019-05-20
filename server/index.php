<?php
require 'vendor/autoload.php';

use Goutte\Client;
use Model\ChampionModel;
use Model\PosteModel;

$urls = [
    "https://www.op.gg/champion/ajax/statistics/trendChampionList/type=winratio&" => "tbody.champion-trend-winratio-ALL > tr > td > a > div.champion-index-table__name, tbody.champion-trend-winratio-ALL > tr > td.champion-index-table__cell--blue",
    "https://www.op.gg/champion/ajax/statistics/trendChampionList/type=pickratio&" => "tbody.champion-trend-pickratio-ALL > tr > td > a > div.champion-index-table__name, tbody.champion-trend-pickratio-ALL > tr > td.champion-index-table__cell--blue",
    "https://www.op.gg/champion/ajax/statistics/trendChampionList/type=banratio&" => "tbody.champion-trend-banratio-ALL > tr > td > a > div.champion-index-table__name, tbody.champion-trend-banratio-ALL > tr > td.champion-index-table__cell--blue",
    "https://www.op.gg/champion/statistics/top" => "tbody.champion-trend-tier-TOP > tr > td.champion-index-table__cell--champion > a > div.champion-index-table__name, tbody.champion-trend-tier-TOP > tr > td.champion-index-table__cell--value > img",
    "https://www.op.gg/champion/statistics/jungle" => "tbody.champion-trend-tier-JUNGLE > tr > td.champion-index-table__cell--champion > a > div.champion-index-table__name, tbody.champion-trend-tier-JUNGLE > tr > td.champion-index-table__cell--value > img",
    "https://www.op.gg/champion/statistics/mid" => "tbody.champion-trend-tier-MID > tr > td.champion-index-table__cell--champion > a > div.champion-index-table__name, tbody.champion-trend-tier-MID > tr > td.champion-index-table__cell--value > img",
    "https://www.op.gg/champion/statistics/adc" => "tbody.champion-trend-tier-ADC > tr > td.champion-index-table__cell--champion > a > div.champion-index-table__name, tbody.champion-trend-tier-ADC > tr > td.champion-index-table__cell--value > img",
    "https://www.op.gg/champion/statistics/support" => "tbody.champion-trend-tier-SUPPORT > tr > td.champion-index-table__cell--champion > a > div.champion-index-table__name, tbody.champion-trend-tier-SUPPORT > tr > td.champion-index-table__cell--value > img"
];

// on recupère winRate et nom 
// on récupère pickRate et nom -> on compare le nom à celui des champions déjà récupérés
// avec le nom on scrap les stats du champion à la bonne url

$win = [];
$pick = [];
$ban = [];
$tierTop = [];
$tierJungle = [];
$tierMid = [];
$tierBot = [];
$tierSupport = [];

foreach ($urls as $url => $selector) {
    $client = new Client();
    $crawler = $client->request('GET', $url);
    $counter = 0;
    $output[$url] = $crawler
        ->filter($selector)
        ->each(function ($node)
        use (&$counter, &$champion, $url, $urls, &$win, &$pick, &$ban, &$tierTop, &$tierJungle, &$tierMid, &$tierBot, &$tierSupport) {
            if ($counter == 0) {
                $champion = [];
                $champion['name'] = $node->text();
            } else if ($counter == 1) {
                if ($url == array_keys($urls)[0]) {
                    $champion['win'] = substr($node->text(), 0, -1);
                } elseif ($url == array_keys($urls)[1]) {
                    $champion['pick'] = substr($node->text(), 0, -1);
                } elseif ($url == array_keys($urls)[2]) {
                    $champion['ban'] = substr($node->text(), 0, -1);
                } elseif ($url == array_keys($urls)[3] || $url == array_keys($urls)[4] || $url == array_keys($urls)[5] || $url == array_keys($urls)[6] || $url == array_keys($urls)[7]) {
                    $champion['tier'] = (int)substr($node->attr('src'), 64, -4);
                }
            }
            $counter++;
            if ($counter == 2) {
                if ($url == array_keys($urls)[0]) {
                    array_push($win, $champion);
                } else if ($url == array_keys($urls)[1]) {
                    array_push($pick, $champion);
                } else if ($url == array_keys($urls)[2]) {
                    array_push($ban, $champion);
                } else if ($url == array_keys($urls)[3]) {
                    array_push($tierTop, $champion);
                } else if ($url == array_keys($urls)[4]) {
                    array_push($tierJungle, $champion);
                } else if ($url == array_keys($urls)[5]) {
                    array_push($tierMid, $champion);
                } else if ($url == array_keys($urls)[6]) {
                    array_push($tierBot, $champion);
                } else if ($url == array_keys($urls)[7]) {
                    array_push($tierSupport, $champion);
                }
                // execute insert into
                $counter = 0;
            }
        });
}

// var_dump("Top ", $tierTop);
// var_dump("Jungle ", $tierJungle);
// var_dump("Mid ", $tierMid);
// var_dump("Bot ", $tierBot);
// var_dump("Support ", $tierSupport);

function fillArray($firstArray, $secondArray, $field)
{
    foreach ($firstArray as $firstKey => $firstValue) {
        foreach ($secondArray as $secondKey => $secondValue) {
            if ($firstValue['name'] == $secondValue['name']) {
                $firstArray[$firstKey][$field] = $secondValue[$field];
            }
        }
    }
}

// fillArray($win, $pick, "pick");
// fillArray($win, $ban, "ban");

foreach ($win as $winKey => $winValue) {
    foreach ($pick as $pickKey => $pickValue) {
        if ($winValue['name'] == $pickValue['name']) {
            $win[$winKey]['pick'] = $pickValue['pick'];
        }
    }
    foreach ($ban as $banKey => $banValue) {
        if ($winValue['name'] == $banValue['name']) {
            $win[$winKey]['ban'] = $banValue['ban'];
        }
    }
}

//var_dump($win);

$finalTier = [];
foreach ($tierTop as $topChampion) {
    $key = array_search($topChampion['name'], array_column($tierSupport, 'name'));
    if ($key) {
        if ($topChampion['tier'] < $tierSupport[$key]['tier']) {
            array_push($finalTier, $topChampion);
        } else {
            array_push($finalTier, $tierSupport[$key]);
        }
    } else {
        array_push($finalTier, $topChampion);
    }
}

foreach ($tierSupport as $supportChampion) {
    $key = array_search($supportChampion['name'], array_column($tierTop, 'name'));
    if (!$key) {
        array_push($finalTier, $supportChampion);
    }
}

var_dump($finalTier);


//$championNames = [];

// var_dump($win);

// foreach ($win as $value) {
//     $championName = strtolower($value['name']);
//     $championName = str_replace(array(" ", "'", "."), "", $championName);
//     $strpos = strpos($championName, "&");
//     if ($strpos) {
//         $championName = substr($championName, 0, $strpos);
//     }
//     array_push($championNames, $championName);
// }
// // var_dump($championNames);

// $posteArray = [
//     "Jungle", "Top", "Middle", "Bottom", "Support"
// ];


// $occupationByChampion = [];

// foreach ($championNames as $name) {
//     $client = new Client();
//     $crawler = $client->request('GET', "https://www.op.gg/champion/" . $name . "/statistics/bot");
//     $output = $crawler
//         ->filter("h1.champion-stats-header-info__name")
//         ->each(function ($node)
//         use ($crawler, &$occupationByChampion) {
//             $placeArray = [];
//             $placeArray['name'] = $node->text();
//             $output2 = $crawler
//                 ->filter("span.champion-stats-header__position__role, span.champion-stats-header__position__rate")
//                 ->each(function ($node)
//                 use (&$placeArray) {
//                     array_push($placeArray, $node->text());
//                 });
//             array_push($occupationByChampion, $placeArray);
//         });
// }
// var_dump($occupationByChampion);

// // PDO 
// try {
//     $conn = new PDO('mysql:dbname=dataviz;host=localhost', 'root', 'root');
// } catch (PDOException $exception) {
//     die($exception->getMessage());
// }

// $poste = new PosteModel();
// $poste->add($posteArray);
