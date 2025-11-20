<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some users for questions
        $users = User::take(5)->get();
        
        if ($users->isEmpty()) {
            // Create some users if none exist
            $users = collect([
                User::create([
                    'name' => 'John Doe',
                    'username' => 'johndoe',
                    'email' => 'john@example.com',
                    'password_hash' => bcrypt('password'),
                    'role' => 'job_seeker',
                    'account_status' => 'active',
                    'email_verified' => true,
                    'email_verified_at' => now(),
                ]),
                User::create([
                    'name' => 'Jane Smith',
                    'username' => 'janesmith',
                    'email' => 'jane@example.com',
                    'password_hash' => bcrypt('password'),
                    'role' => 'job_seeker',
                    'account_status' => 'active',
                    'email_verified' => true,
                    'email_verified_at' => now(),
                ]),
                User::create([
                    'name' => 'Mike Johnson',
                    'username' => 'mikej',
                    'email' => 'mike@example.com',
                    'password_hash' => bcrypt('password'),
                    'role' => 'recruiter',
                    'account_status' => 'active',
                    'email_verified' => true,
                    'email_verified_at' => now(),
                ]),
            ]);
        }

        // Create demo questions
        $questions = [
            [
                'user_id' => $users->random()->id,
                'title' => 'How do you reverse a linked list in Python?',
                'difficulty' => 'medium',
                'is_anonymous' => false,
                'view_count' => rand(100, 500),
                'vote_count' => rand(10, 50),
                'answer_count' => 3,
                'is_solved' => true,
                'status' => 'open',
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now()->subDays(rand(1, 5)),
            ],
            [
                'user_id' => $users->random()->id,
                'title' => 'Explain the difference between process and thread',
                'difficulty' => 'easy',
                'is_anonymous' => false,
                'view_count' => rand(200, 600),
                'vote_count' => rand(15, 60),
                'answer_count' => 5,
                'is_solved' => true,
                'status' => 'open',
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now()->subDays(rand(1, 5)),
            ],
            [
                'user_id' => $users->random()->id,
                'title' => 'What is the time complexity of binary search tree operations?',
                'difficulty' => 'hard',
                'is_anonymous' => false,
                'view_count' => rand(150, 400),
                'vote_count' => rand(20, 70),
                'answer_count' => 4,
                'is_solved' => false,
                'status' => 'open',
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now()->subDays(rand(1, 5)),
            ],
            [
                'user_id' => $users->random()->id,
                'title' => 'How does React hooks work internally?',
                'difficulty' => 'medium',
                'is_anonymous' => false,
                'view_count' => rand(300, 800),
                'vote_count' => rand(25, 80),
                'answer_count' => 6,
                'is_solved' => true,
                'status' => 'open',
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now()->subDays(rand(1, 5)),
            ],
            [
                'user_id' => $users->random()->id,
                'title' => 'Design a scalable REST API for a social media platform',
                'difficulty' => 'hard',
                'is_anonymous' => false,
                'view_count' => rand(250, 700),
                'vote_count' => rand(30, 100),
                'answer_count' => 8,
                'is_solved' => false,
                'status' => 'open',
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now()->subDays(rand(1, 5)),
            ],
        ];

        // Insert questions and collect their IDs
        $questionIds = [];
        foreach ($questions as $question) {
            $id = DB::table('questions')->insertGetId($question, 'question_id');
            $questionIds[] = $id;
        }

        // Create demo answers for each question
        $answers = [
            [
                'question_id' => $questionIds[0],
                'user_id' => $users->random()->id,
                'body' => 'To reverse a linked list in Python, you can use an iterative approach. Initialize three pointers: previous, current, and next. Traverse the list, updating the next pointer of each node to point to its previous node. Finally, update the head to point to the new first node (previously the last node).',
                'vote_count' => rand(5, 20),
                'is_accepted' => true,
                'status' => 'active',
                'created_at' => now()->subDays(rand(1, 25)),
                'updated_at' => now()->subDays(rand(1, 3)),
            ],
            [
                'question_id' => $questionIds[0],
                'user_id' => $users->random()->id,
                'body' => 'Another approach is to use recursion. The base case is when the node is None or the next node is None. For the recursive case, reverse the rest of the list and then adjust the pointers accordingly.',
                'vote_count' => rand(3, 15),
                'is_accepted' => false,
                'status' => 'active',
                'created_at' => now()->subDays(rand(1, 20)),
                'updated_at' => now()->subDays(rand(1, 2)),
            ],
            [
                'question_id' => $questionIds[0],
                'user_id' => $users->random()->id,
                'body' => 'Here\'s a complete Python implementation:

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    prev = None
    current = head
    
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    
    return prev
```',
                'vote_count' => rand(10, 30),
                'is_accepted' => false,
                'status' => 'active',
                'created_at' => now()->subDays(rand(1, 15)),
                'updated_at' => now()->subDays(rand(1, 1)),
            ],
            [
                'question_id' => $questionIds[1],
                'user_id' => $users->random()->id,
                'body' => 'A process is an independent program in execution with its own memory space, while a thread is a lightweight subprocess within a process that shares the process\'s memory space. Processes are isolated from each other, but threads within the same process can directly access shared data.',
                'vote_count' => rand(15, 40),
                'is_accepted' => true,
                'status' => 'active',
                'created_at' => now()->subDays(rand(1, 25)),
                'updated_at' => now()->subDays(rand(1, 3)),
            ],
            [
                'question_id' => $questionIds[1],
                'user_id' => $users->random()->id,
                'body' => 'Processes have higher overhead for creation and context switching compared to threads. Threads are more efficient for tasks that require shared memory, while processes are better for tasks that need strong isolation.',
                'vote_count' => rand(8, 25),
                'is_accepted' => false,
                'status' => 'active',
                'created_at' => now()->subDays(rand(1, 20)),
                'updated_at' => now()->subDays(rand(1, 2)),
            ],
        ];

        // Insert answers
        foreach ($answers as $answer) {
            DB::table('answers')->insert($answer);
        }
    }
}