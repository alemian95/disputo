<?php

namespace App\Models;

use App\Http\Requests\Thread\StoreThreadRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Thread extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'content'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id', 'id');
    }

    public static function createFromRequest(StoreThreadRequest $request): self
    {
        $thread = new Thread;
        $thread->fill($request->validated());

        $thread->category_id = Category::findByCode($request->category)->id;
        $thread->author_id = $request->user()->id;

        return $thread;
    }
}
