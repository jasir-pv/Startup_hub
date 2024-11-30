'use client'

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { z } from "zod"
import { formSchema } from '@/lib/validation';


const StartupForm = () => {

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");

  const handleFormSubmit= async (prevState: any, formData: FormData)=>{
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      }
      await formSchema.parseAsync(formValues);


      console.log(formValues)

      // const result = await createPitch(prevState, formData, pitch);


      // return result;

    } catch (error) {

      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);
  
  
        return { ...prevState, error: "Validation failed", status: "ERROR" };

        return {
          ...prevState,
          error: "An unexpected error has occurred",
          status: "ERROR",
        };

      }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit,
    {error: "" ,
     status:'INITIAL'}
  )


  return (
    <div>
      <form action={formAction} className='startup-form'>
        {/* input title */}
        <div>
            <label htmlFor="title" className='startup-form_label'>Title</label>
              <Input 
                id='title'
                name='title'
                className='startup-form_input'
                required
                placeholder='Startup Title'
              />
              {errors.title && <p className='startup-form_error'>{errors.title}</p>}
    </div>

{/* Description */}
    <div>
            <label htmlFor="description" className='startup-form_label'>Description</label>
              <Textarea 
                id='description'
                name='description'
                className='startup-form_textarea'
                required
                placeholder='Startup Description'
              />
              {errors.description && <p className='startup-form_error'>{errors.description}</p>}
    </div>
    {/* Category */}
    <div>
            <label htmlFor="category" className='startup-form_label'>Category</label>
              <Input 
                id='category'
                name='category'
                className='startup-form_input'
                required
                placeholder='Startup Category (Tech, Health, Education)'
              />
              {errors.category && <p className='startup-form_error'>{errors.category}</p>}
    </div>
    {/* Image link */}
    <div>
            <label htmlFor="link" className='startup-form_label'>Link</label>
              <Input 
                id='link'
                name='link'
                className='startup-form_input'
                required
                placeholder='Startup Image URL'
              />
              {errors.link && <p className='startup-form_error'>{errors.link}</p>}
    </div>

{/* Pitch */}
    <div data-color-mode='light'>
            <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
              <MDEditor
                value={pitch}
                onChange= { (value) => setPitch(value as string)}
                id='pitch'
                preview='edit'
                height={300}
                style={{borderRadius: 20, overflow: "hidden"}}
                textareaProps={{
                  placeholder:'Breafly describe your idea and what problem it solves',
                }}
                previewOptions={{
                  disallowedElements:['style']
                }}
              />
              {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
          </div>

          {/* button */}

          <Button type='submit' className='startup-form_btn text-white'  disabled={isPending}> 
           {isPending ? 'Submiting...' : "Submit Your Pitch" }
           <Send className='size-6 ml-2'/>
             </Button>
      </form>

    </div>
  )
  }




export default StartupForm
