import { Env } from '.environments';
import { getAuthToken } from '@modules/auth/lib/utils';
import { Spin } from 'antd';
import { type IJoditEditorProps, Jodit } from 'jodit-react';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
  loading: () => <Spin />,
});

interface IProps {
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const RichTextEditor: React.FC<IProps> = ({
  disabled = false,
  placeholder = 'Start writing...',
  value = '',
  onChange,
}) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(value);

  const beautifyHtmlFn = (html: string) => {
    if (html === '<p><br></p>') return '';
    else {
      return html
        ?.replace(/ role="[^"]*"/g, '')
        .replace(/ dir="[^"]*"/g, '')
        .replace(/ align="[^"]*"/g, '')
        .replace(/<p><span>(.*?)<\/span><\/p>/g, '<p>$1</p>');
    }
  };

  useEffect(() => {
    setContent(value);
  }, [value]);

  const config = useMemo<IJoditEditorProps['config']>(
    () => ({
      theme: 'custom',
      readonly: false,
      disabled,
      placeholder,
      height: 400,
      tabIndex: 1,
      disablePlugins: ['file'],
      extraButtons: [
        {
          name: 'tab',
          text: 'Tab',
          exec: (editor: Jodit) => {
            editor.s.insertHTML('&nbsp;&nbsp;&nbsp;&nbsp;');
            editor.synchronizeValues();
          },
        },
        {
          name: 'clear',
          text: 'Clear',
          exec: (editor: Jodit) => {
            editor.value = '';
            editor.synchronizeValues();
          },
        },
      ],
      uploader: {
        url: `${Env.apiUrl}/uploads`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        filesVariableName: function () {
          return 'files';
        },
        isSuccess: function (e: any) {
          return e?.success;
        },
        getMessage: function (e: any) {
          return e?.message;
        },
        prepareData: function (data: any) {
          return data;
        },
        process: function (res: any) {
          return {
            success: res?.success,
            message: res?.message,
            file: res?.data?.[0],
          };
        },
        defaultHandlerSuccess: function (this: any, res: any) {
          if (res?.file) {
            const elem = this.createInside.element('img');
            elem.setAttribute('src', res?.file);
            this.s.insertImage(elem as HTMLImageElement, null, this.o.imageDefaultWidth);
          }
        },
        defaultHandlerError: function (this: any, e: Error) {
          this?.j?.e?.fire('errorMessage', e?.message);
        },
        contentType: function (this: any, e: any): any {
          return (
            (void 0 === this?.jodit?.ownerWindow?.FormData || 'string' == typeof e) &&
            'application/x-www-form-urlencoded; charset=UTF-8'
          );
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [placeholder, disabled],
  );

  return (
    <JoditEditor
      ref={editorRef}
      config={config}
      value={content}
      onBlur={(newContent) => setContent(beautifyHtmlFn(newContent))}
      onChange={(newContent) => onChange(beautifyHtmlFn(newContent))}
    />
  );
};

export default RichTextEditor;
