<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoriesData = [
            [
                'name' => 'Frontend',
                'slug' => 'frontend',
                'description' => 'Frontend development technologies and frameworks',
                'icon' => '💻',
                'color' => '#3b82f6',
                'tags' => ['React', 'Vue', 'Angular', 'Svelte', 'CSS', 'HTML', 'JavaScript', 'TypeScript']
            ],
            [
                'name' => 'Backend',
                'slug' => 'backend',
                'description' => 'Backend development technologies and frameworks',
                'icon' => '⚙️',
                'color' => '#10b981',
                'tags' => ['Laravel', 'PHP', 'Node.js', 'Python', 'Django', 'Ruby', 'Rails', 'Go']
            ],
            [
                'name' => 'DevOps',
                'slug' => 'devops',
                'description' => 'DevOps tools and practices',
                'icon' => '🚀',
                'color' => '#f59e0b',
                'tags' => ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Linux', 'Nginx']
            ],
            [
                'name' => 'Database',
                'slug' => 'database',
                'description' => 'Database systems and technologies',
                'icon' => '🗄️',
                'color' => '#8b5cf6',
                'tags' => ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite']
            ],
            [
                'name' => 'Mobile',
                'slug' => 'mobile',
                'description' => 'Mobile development technologies',
                'icon' => '📱',
                'color' => '#ec4899',
                'tags' => ['React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin']
            ],
        ];

        foreach ($categoriesData as $categoryData) {
            // Create or get category
            $category = DB::table('categories')->where('slug', $categoryData['slug'])->first();
            
            if (!$category) {
                $categoryId = DB::table('categories')->insertGetId([
                    'name' => $categoryData['name'],
                    'slug' => $categoryData['slug'],
                    'description' => $categoryData['description'],
                    'icon' => $categoryData['icon'],
                    'color' => $categoryData['color'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } else {
                $categoryId = $category->id;
            }

            // Create tags and link to category
            foreach ($categoryData['tags'] as $tagName) {
                // Check if tag exists
                $tag = DB::table('tags')->where('name', $tagName)->first();
                
                if (!$tag) {
                    DB::table('tags')->insert([
                        'name' => $tagName,
                        'description' => "Questions related to $tagName",
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    
                    // Get the tag_id after insert
                    $tagId = DB::table('tags')->where('name', $tagName)->value('tag_id');
                } else {
                    $tagId = $tag->tag_id;
                }

                // Link tag to category (if not already linked)
                $exists = DB::table('category_tag')
                    ->where('category_id', $categoryId)
                    ->where('tag_id', $tagId)
                    ->exists();

                if (!$exists) {
                    DB::table('category_tag')->insert([
                        'category_id' => $categoryId,
                        'tag_id' => $tagId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}