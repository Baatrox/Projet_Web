<?php

namespace Database\Seeders;

use App\Models\Etudiant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EtudiantSeeder extends Seeder
{
    public function run(): void
    {
        $students = [
            ['login' => 'ahmed', 'pass' => Hash::make('ahmed123'), 'nom' => 'Ahmed', 'note1' => 14, 'note2' => 16, 'moyenne' => 15.0, 'longitude' => -7.6192, 'latitude' => 33.5731],
            ['login' => 'sara', 'pass' => Hash::make('sara123'), 'nom' => 'Sara', 'note1' => 12, 'note2' => 13, 'moyenne' => 12.5, 'longitude' => -5.0078, 'latitude' => 34.0209],
            ['login' => 'anouar', 'pass' => Hash::make('anouar123'), 'nom' => 'Anouar', 'note1' => 10, 'note2' => 11, 'moyenne' => 10.5, 'longitude' => -8.0083, 'latitude' => 31.6295],
            ['login' => 'amine', 'pass' => Hash::make('amine123'), 'nom' => 'Amine', 'note1' => 15, 'note2' => 13, 'moyenne' => 14.0, 'longitude' => -4.0083, 'latitude' => 30.4278],
            ['login' => 'badr', 'pass' => Hash::make('badr123'), 'nom' => 'Badr', 'note1' => 16, 'note2' => 15, 'moyenne' => 15.5, 'longitude' => -6.8498, 'latitude' => 34.0],
        ];

        foreach ($students as $student) {
            Etudiant::create($student);
        }
    }
}
