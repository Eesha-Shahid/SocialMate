'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import {useRouter} from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles


// Components
import Sidebar from "@/components/Sidebar";

// Types
import { ScheduledRedditPost } from '@/types/RedditUser';
import { Flair } from '@/types/RedditUser'

// Services
import RedditService from '@/services/RedditService';
import FlairsComponent from '@/components/Flairs';
import { authStyle } from '@/styles/authStyle';


const SchedulePost = () => {
    const router = useRouter();
    const [postType, setPostType] = useState('self');
    const [flairs, setFlairs] = useState<Flair[] | null | 0>(0);
    const [selectedFlair, setSelectedFlair] = useState<Flair | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [scheduledDate, setScheduledDate] = useState(new Date());

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

    const handleSubmit= async(values: ScheduledRedditPost) => {
        values.scheduledTime = scheduledDate;
        try {
            if (postType === 'self') {
                values.url = '';
            } else if (postType === 'link') {
                values.text = '';
            }
            const data = await RedditService.schedulePost(values.sr, values.title, values.text, values.url, values.flairId, values.flairName, values.scheduledTime);
            if (data.success == false){
                setErrorMessage(data.errors[0]);
                setShowOverlay(true);
            }
            else if (data != null){
                alert("Post Scheduled Successfully")
                router.push('/dashboard/reddit');
            }
        } 
        catch (error) {
            console.error('Submit error:', (error as Error).message);
            setErrorMessage(`Oops, ${(error as Error).message}`);
            setShowOverlay(true);
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '10rem', paddingTop: '4rem'}}>
                <h1>Schedule Reddit Post</h1>

                {/* Post Type */}
                <label style={{textAlign: 'left', marginBottom: '10px'}}>
                    Post Type
                    <select style={dropdownStyle} value={postType} onChange={handlePostTypeChange}>
                        <option value="self">Self</option>
                        <option value="link">Link</option>
                        {/* <option value="image">Image</option>
                        <option value="video">Video</option> */}
                    </select>
                </label><br /><br />

                {/* Form */}
                <Formik
                    initialValues={{
                        _id: Object('.'),
                        sr: '',
                        title: '',
                        text: '',
                        url: '',
                        flairName: '',
                        flairId: '',
                        scheduledTime: new Date()
                    }}
                    onSubmit={(values: ScheduledRedditPost, { setSubmitting }: FormikHelpers<ScheduledRedditPost>) => {
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
                            {/* {postType === 'image' && <div><label style={{textAlign: 'left', marginBottom: '5px'}}>Image: <Field type="file" name="image" /></label></div>} 
                            {postType === 'video' && <div><label style={{textAlign: 'left', marginBottom: '5px'}}>Video: <Field type="file" name="video" /></label></div>}  */}

                            {/* Scheduled Date and Time */}
                            <div>
                                <br />
                                <label style={{ textAlign: 'left', marginBottom: '5px' }}>Scheduled Date and Time:</label>
                                <br />
                                <DatePicker
                                    selected={scheduledDate}
                                    onChange={(date) => {
                                        setScheduledDate(date as Date);
                                    }}
                                showTimeSelect
                                dateFormat="Pp"
                                />
                            </div>
                            <br /><br />
                            <button style={buttonStyle} type="submit">Schedule</button>
                        </Form>
                    )}
                </Formik>

                {showOverlay && (
                    <div style={authStyle.overlay}>
                        <div style={authStyle.overlayContent}>
                        <p>{errorMessage}</p>
                        <button style={authStyle.overlayContentButton} onClick={() => setShowOverlay(false)}>Close</button>
                        </div>
                    </div>
                )}
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

export default SchedulePost;
