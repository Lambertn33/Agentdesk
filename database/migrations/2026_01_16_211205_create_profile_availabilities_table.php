<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profile_availabilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')->constrained('profiles')->onDelete('cascade');
            $table->enum('day_of_week', App\Models\ProfileAvailability::DAY_OF_WEEK);
            $table->enum('time_block', App\Models\ProfileAvailability::TIME_BLOCK);
            $table->enum('mode', App\Models\ProfileAvailability::MODE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_availabilities');
    }
};
