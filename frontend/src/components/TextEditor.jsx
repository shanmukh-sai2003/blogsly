import JoditEditor from 'jodit-react';
import { useRef, useState, useMemo } from 'react';

function TextEditor(props) {
    const { placeholder, setTheContent, content } = props;
    const editor = useRef(null);
    
    const config = useMemo(() => {
            return {
                readonly: false,
                placeholder: placeholder || 'Start typings...',
                height: '65vh'
            }
        },
		[placeholder]
	);

    return (
        <>
            <div className='flex justify-center my-8'>
                <div  className='w-[75vw]'>
                    <JoditEditor 
                        ref={editor}
                        config={config}
                        value={content}
                        tabIndex={1}
                        onBlur={newContent => setTheContent(newContent)}
                    />
                </div>
            </div>
        </>
    );
}

export default TextEditor;