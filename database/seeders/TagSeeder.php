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
        $tags = [
            ['name' => 'Python', 'description' => 'Python programming language', 'category' => 'Programming Language'],
            ['name' => 'JavaScript', 'description' => 'JavaScript programming language', 'category' => 'Programming Language'],
            ['name' => 'Java', 'description' => 'Java programming language', 'category' => 'Programming Language'],
            ['name' => 'C++', 'description' => 'C++ programming language', 'category' => 'Programming Language'],
            ['name' => 'React', 'description' => 'React JavaScript library', 'category' => 'Frontend Framework'],
            ['name' => 'Vue.js', 'description' => 'Vue.js JavaScript framework', 'category' => 'Frontend Framework'],
            ['name' => 'Angular', 'description' => 'Angular JavaScript framework', 'category' => 'Frontend Framework'],
            ['name' => 'Node.js', 'description' => 'Node.js JavaScript runtime', 'category' => 'Backend Technology'],
            ['name' => 'Express', 'description' => 'Express.js web framework', 'category' => 'Backend Framework'],
            ['name' => 'Django', 'description' => 'Django Python web framework', 'category' => 'Backend Framework'],
            ['name' => 'Flask', 'description' => 'Flask Python web framework', 'category' => 'Backend Framework'],
            ['name' => 'SQL', 'description' => 'Structured Query Language', 'category' => 'Database'],
            ['name' => 'MongoDB', 'description' => 'MongoDB NoSQL database', 'category' => 'Database'],
            ['name' => 'PostgreSQL', 'description' => 'PostgreSQL relational database', 'category' => 'Database'],
            ['name' => 'MySQL', 'description' => 'MySQL relational database', 'category' => 'Database'],
            ['name' => 'Git', 'description' => 'Version control system', 'category' => 'Tools'],
            ['name' => 'Docker', 'description' => 'Containerization platform', 'category' => 'Tools'],
            ['name' => 'AWS', 'description' => 'Amazon Web Services', 'category' => 'Cloud'],
            ['name' => 'Azure', 'description' => 'Microsoft Azure cloud platform', 'category' => 'Cloud'],
            ['name' => 'Google Cloud', 'description' => 'Google Cloud Platform', 'category' => 'Cloud'],
            ['name' => 'Data Structures', 'description' => 'Data structures concepts', 'category' => 'Computer Science'],
            ['name' => 'Algorithms', 'description' => 'Algorithm design and analysis', 'category' => 'Computer Science'],
            ['name' => 'System Design', 'description' => 'System design principles', 'category' => 'Software Engineering'],
            ['name' => 'OOP', 'description' => 'Object-oriented programming', 'category' => 'Programming Paradigm'],
            ['name' => 'REST API', 'description' => 'RESTful API design', 'category' => 'Web Development'],
        ];

        foreach ($tags as $tag) {
            DB::table('tags')->updateOrInsert(
                ['name' => $tag['name']],
                [
                    'description' => $tag['description'],
                    'category' => $tag['category'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}