<?php

$xml=simplexml_load_file("protected/application.xml") or die("Error: Cannot create object");
echo $xml->parameters[0]->parameters;
$host = 'localhost';
$user = 'root';
$password = '';
$db = 'portalekampus';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $q = $conn->query ("SELECT `key`,`value` FROM setting WHERE `group`='cron'");
    $q->setFetchMode(PDO::FETCH_ASSOC);
    $variable = $q->fetchAll();
    
    $q = $conn->query ("SELECT 
                            rm.nim,
                            SUM(vn.sks) AS jumlah_sks
                        FROM register_mahasiswa rm 
                            JOIN v_nilai vn ON rm.nim=vn.nim
                        WHERE rm.k_status!='L'
                            AND vn.n_kual != 'E' 
                            AND vn.n_kual != 'D' 
                        GROUP BY
                            rm.nim
                        HAVING SUM(vn.sks) >= 144
                    ");
    $q->setFetchMode(PDO::FETCH_ASSOC);
    $calonwisuda = $q->fetchAll();
    
    foreach ($calonwisuda as $v) {
        
    }
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}