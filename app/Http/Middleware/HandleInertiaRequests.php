<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $categories = [];
        
        if ($request->user()) {
            $categories = \Illuminate\Support\Facades\DB::table('categories')
                ->select('categories.id', 'categories.name', 'categories.slug', 'categories.icon', 'categories.color')
                ->orderBy('categories.name')
                ->get()
                ->map(function ($category) {
                    // Get tags for this category
                    $tags = \Illuminate\Support\Facades\DB::table('category_tag')
                        ->join('tags', 'category_tag.tag_id', '=', 'tags.tag_id')
                        ->where('category_tag.category_id', $category->id)
                        ->select('tags.tag_id', 'tags.name', 'tags.question_count')
                        ->orderBy('tags.name')
                        ->get();
                    
                    return [
                        'id' => $category->id,
                        'name' => $category->name,
                        'slug' => $category->slug,
                        'icon' => $category->icon,
                        'color' => $category->color,
                        'tags' => $tags
                    ];
                });
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'categories' => $categories,
        ];
    }
}
