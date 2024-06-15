<?php

namespace App\Http\Controllers;

use App\Models\Questions;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
// use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response;


class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        //
        return Inertia::render('Questions/Index', []);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Questions/SubmitQuestions', []);
    }

    public function getQuestion($id)
    {
        //
        // $question = Questions::find();
        $question = Questions::where("category", "=", "$id")->get();

        // echo json_encode($question);
        return Inertia::render('Questions/Start', [
            'quizz' => $question
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'category' => 'required|string|max:255',
            'questions' => 'required|string',
        ]);

        $user = Questions::create([
            'category' => $request->category,
            'questions' => $request->questions,
        ]);

        return json_encode(["success" => "true"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Questions $questions)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Questions $questions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Questions $questions)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Questions $questions)
    {
        //
    }
}
