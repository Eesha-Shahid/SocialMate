'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import {useRouter} from 'next/navigation';

// Components
import Sidebar from "@/components/Sidebar";

// Types
import { RedditPost } from '@/types/RedditUser';
import { Flair } from '@/types/RedditUser'

// Services
import RedditService from '@/services/RedditService';
import FlairsComponent from '@/components/Flairs';


const CreatePost = () => {
    const router = useRouter();
    const [postType, setPostType] = useState('self');
    const [flairs, setFlairs] = useState<Flair[] | null | 0>(0);
    const [selectedFlair, setSelectedFlair] = useState<Flair | null>(null);

    const handlePostTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPostType(e.target.value);
    };

    const handleFlairSelection = (flair: Flair) => {
        setSelectedFlair(flair);
    };    

    const handleFetchFlairs = async (subreddit: string) => {
        try {
            const data = await RedditService.getFlairs(subreddit);
            setFlairs(data); 
        } 
        catch (error) {
            console.log("Flair Fetching failed: ",error)
        }
    };

    const handleSubmit= async(values: RedditPost) => {
        try {
            const data = await RedditService.submitPost(values.sr, values.title, values.text, values.url, values.flairId, values.flairName);
            console.log(data)
            alert("Post Created Successfully")
            router.push('/dashboard/reddit');
        } catch (error) {
            console.error('Submit error:', (error as Error).message);
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '10rem', paddingTop: '4rem'}}>
                <h1>Create Reddit Post</h1>

                {/* Post Type */}
                <label style={{textAlign: 'left', marginBottom: '10px'}}>
                    Post Type
                    <select style={dropdownStyle} value={postType} onChange={handlePostTypeChange}>
                        <option value="self">Self</option>
                        <option value="link">Link</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                    </select>
                </label><br /><br />

                {/* Form */}
                <Formik
                    initialValues={{
                        sr: '',
                        title: '',
                        text: '',
                        url: '',
                        flairName: '',
                        flairId: '',
                    }}
                    onSubmit={(values: RedditPost, { setSubmitting }: FormikHelpers<RedditPost>) => {
                        setTimeout(() => {
                            const updatedValues = {
                                ...values,
                                flairName: selectedFlair?.text || '',
                                flairId: selectedFlair?.id || '',
                            };
                            handleSubmit(updatedValues);
                            setSubmitting(false);
                        }, 500);
                    }}
                >

                    {({ values }) => (
                        <Form>                
                            <div>
                                <label style={{textAlign: 'left', marginBottom: '5px'}}>Subreddit (sr)
                                    <Field style={fieldStyles} type="text" name="sr" />
                                </label>
                                <button style={buttonStyle} type="button" onClick={() => handleFetchFlairs(values.sr)}>Fetch Flairs</button><br />
                                {flairs === null && <p>Subreddit doesn't exist</p>}
                                {flairs != null && flairs != 0 && <FlairsComponent flairs={flairs} onSelectFlair={handleFlairSelection} />}
                            </div><br />
                            <div>
                                <label style={{textAlign: 'left', marginBottom: '5px'}}>Title:
                                <Field style={fieldStyles} type="text" name="title" /></label>
                            </div><br />
                            {postType === 'self' && <div><label style={{textAlign: 'left', marginBottom: '5px'}}>Text:
                                <Field style={textareaStyle} as="textarea" name="text" /></label></div>}
                            {postType === 'link' && <div><label style={{textAlign: 'left', marginBottom: '5px'}}>URL: <Field style={fieldStyles} type="text" name="url" /></label></div>} 
                            {postType === 'image' && <div><label style={{textAlign: 'left', marginBottom: '5px'}}>Image: <Field type="file" name="image" /></label></div>} 
                            {postType === 'video' && <div><label style={{textAlign: 'left', marginBottom: '5px'}}>Video: <Field type="file" name="video" /></label></div>} 
                            <br /><br />
                            <button style={buttonStyle} type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

const fieldStyles = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '5px',
    paddingRight:'120px',
    margin: '8px 0',
    minHeight: '30px', 
    display: 'flex',
    alignItems: 'center',
};

const buttonStyle: React.CSSProperties = {
    backgroundColor: 'black',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '20px',
};

const dropdownStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    cursor: 'pointer',
};

const textareaStyle: React.CSSProperties = {
    width: '95%',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'vertical',
};

export default CreatePost;
