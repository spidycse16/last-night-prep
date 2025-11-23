<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Frontend' => ['React', 'Vue', 'Angular', 'Svelte', 'CSS', 'HTML', 'JavaScript', 'TypeScript'],
            'Backend' => ['Laravel', 'PHP', 'Node.js', 'Python', 'Django', 'Ruby', 'Rails', 'Go'],
            'DevOps' => ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Linux', 'Nginx'],
            'Database' => ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite'],
            'Mobile' => ['React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin'],
        ];

        foreach ($categories as $category => $tags) {
            foreach ($tags as $tagName) {
                // Check if tag exists
                $exists = DB::table('tags')->where('name', $tagName)->exists();
                
                if (!$exists) {
                    DB::table('tags')->insert([
                        'name' => $tagName,
                        'category' => $category,
                        'description' => "Questions related to $tagName",
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                } else {
                    // Update category if it exists but has no category
                    DB::table('tags')
                        ->where('name', $tagName)
                        ->update(['category' => $category]);
                }
            }
        }
    }
}