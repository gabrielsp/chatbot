import { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillWrapper = forwardRef((props: any, ref) => {
  const quillRef = useRef<ReactQuill>(null);

  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current?.getEditor(),
    getValue: () => quillRef.current?.value,
    setValue: (value: string) => {
      if (quillRef.current) {
        quillRef.current.value = value;
      }
    }
  }));

  return <ReactQuill ref={quillRef} {...props} />;
});

export default QuillWrapper;