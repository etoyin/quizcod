import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';
import TextArea from '@/Components/TextArea';
import axios from 'axios';
// import { stringify } from 'postcss';

export default function SubmitQuestion() {
    const { data, setData, post, processing, errors, reset } = useForm({
        validate: false,
        category: '',
        questions: [
            {
                question: "",
                choices: ["", "", "", ""],
                correctAnswer: '',
            },
        ],
    });

    const [loading, setLoading] = useState(false);

    // const [inputs, setInputs] = useState([{ firstName: "", lastName: "" }]);

    const handleAddInput = () => {
        setData({...data, 
            questions: [...data.questions, 
                {
                    question: "",
                    choices: ["", "", "", ""],
                    correctAnswer: '',
                }
            ]
        });
    };

    const handleQChange = (e, index) => {
        let value  = e.target.value;
        let myD = data;
        myD.questions[index].question = value
        setData({...myD});
        console.log(data);
    };

    const handleDeleteInput = (e, index) => {
        e.preventDefault();
        const newRes = {...data};
        newRes.questions.splice(index, 1);
        setData(newRes);
        console.log(newRes);
    };

    const handleRadio = (e, index) => {
        let data_bind = e.target.getAttribute("data-bind");
        let val = document.getElementById(data_bind);
        let form = document.getElementsByTagName("input");
        // console.log(form);
        var elements = form;
        for (var i = 0; i <elements.length; ++i) {
            if(elements[i].type == 'text'){
                elements[i].disabled = false;
            }
        }
        val.disabled = true;
        let myD = data;
        myD.questions[index].correctAnswer = val.value
        setData({...myD});

        console.log(data);
    }

    const handleOption = (e, index) => {
        let i = e.target.getAttribute("data-bind");
        let value = e.target.value;

        let p = data.questions[index].choices;
        p[i] = value;
        let myD = data;
        myD.questions[index].choices = p
        setData({...myD});

        console.log(data);
    }

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        let v = true && data.category.length > 0;
        console.log(data.category.length)
        for(let i=0; i<data.questions.length; i++){
            v = v && data.questions[i].question.length >= 5 && data.questions[i].choices.length == 4
                && data.questions[i].choices[0].length > 1 && data.questions[i].choices[1].length > 1
                && data.questions[i].choices[2].length > 1 && data.questions[i].choices[3].length > 1
                && data.questions[i].correctAnswer.length > 1;
            console.log(v);
        }
        

        if(v){
            // post();

            // let fd = new FormData();
            // fd.append("category", data.category);
            // fd.append("questions", JSON.stringify(data.questions));

            axios.post('/submit_questions', {
                "category": data.category,
                "questions": JSON.stringify(data.questions)
            })
            .then(res => console.log(res))
            .then(res => {
                setLoading(false);
                alert("Questions Saved!");
            })
            .catch((error) => {
                alert(`${error} \n Category already entered choice another`);
                setLoading(false);
            })

            console.log(data);
        }
    };

    return (
        <div className='w-full p-5 mx-auto md:w-1/2 shadow-lg mt-10'>
            <Head title="Form" />

            <form onSubmit={submit}>
                <div className=''>
                    <InputLabel htmlFor="Category" value="Category" />

                    <SelectInput
                        id="category"
                        name="category"
                        title="category"
                        value={data.category}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        options={["cat1", "cat2", "cat3"]}
                        isFocused={true}
                        onChange={(e) => setData({...data, 'category': e.target.value.toString()})}
                        required
                    />

                    <InputError message={errors.category} className="mt-2" />
                </div>

                <div className="mt-4">

                    {
                        data.questions.map((question, index) => {
                            return(
                                <div key={index}>
                                    {console.log(question)}
                                    <InputLabel htmlFor={index} value={`Question ${index+1}`} />
                                    <TextArea 
                                        id={index}
                                        name={index}
                                        type="text"
                                        onChange={(e) => handleQChange(e, index)}
                                        required
                                        value={question.question}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.category} className="mt-2" />

                                    <div className="flex flex-wrap">
                                        <div className='mt-2 mr-5 w-15'>
                                            <TextInput required onChange={(e) => {handleRadio(e, index)}} className="mr-1" type="radio" data-bind={`option1${index}`} name={`question_${index+1}`}/>
                                            <TextInput required value={question.choices[0]} onChange={(e) => {handleOption(e, index)}} type="text" id={`option1${index}`} data-bind={0} name={`option_1_${index+1}`}/>
                                        </div>
                                        <div className='mt-2 mr-5 w-15'>
                                            <TextInput required onChange={(e) => {handleRadio(e, index)}} className="mr-1" data-bind={`option2${index}`} type="radio" name={`question_${index+1}`}/>
                                            <TextInput required value={question.choices[1]} onChange={(e) => {handleOption(e, index)}} type="text" id={`option2${index}`} data-bind={1} name={`option_2_${index+1}`}/>
                                        </div>
                                        <div className='mt-2 mr-5 w-15'>
                                            <TextInput required onChange={(e) => {handleRadio(e, index)}} className="mr-1" data-bind={`option3${index}`} type="radio" name={`question_${index+1}`}/>
                                            <TextInput required value={question.choices[2]} onChange={(e) => {handleOption(e, index)}} type="text" id={`option3${index}`} data-bind={2} name={`option_3_${index+1}`}/>
                                        </div>
                                        <div className='mt-2 mr-5 w-15'>
                                            <TextInput required onChange={(e) => {handleRadio(e, index)}} className="mr-1" data-bind={`option4${index}`} type="radio" name={`question_${index+1}`}/>
                                            <TextInput required value={question.choices[3]} onChange={(e) => {handleOption(e, index)}} type="text" id={`option4${index}`} data-bind={3} name={`option_4_${index+1}`}/>
                                        </div>
                                    </div>
                                    <div className='flex flex-reverse'>
                                        {data.questions.length > 1 && (
                                            <PrimaryButton className={`ml-auto auto bg-ruby `} onClick={(e) => handleDeleteInput(e, index)}>Delete</PrimaryButton>
                                        )}
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>
                    {
                        <PrimaryButton className='bg-blue mt-2' onClick={() => handleAddInput()}>Add</PrimaryButton>
                    }
            
                <div className="flex items-center justify-center mt-4">

                    <PrimaryButton className="ms-4 w-32  bg-blue" disabled={loading}>
                        <p className="mx-auto text-center">
                            Submit
                        </p>
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
