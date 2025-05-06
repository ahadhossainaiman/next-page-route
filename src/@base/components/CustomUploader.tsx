import { Env } from '.environments';
import { ImagePaths } from '@lib/constant';
import { getAuthToken } from '@modules/auth/lib/utils';
import { Button, Image, message, notification, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';

interface IUploadProps {
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
  maxCount?: number;
  initialValue: string[] | string;
  onChange: (url: string) => void;
  acceptedType?: string[];
  sizeLimit?: number;
  body?: React.ReactNode;
  imageCrop?: boolean;
  cropRatio?: number;
  isRemoveIcon?: boolean;
}
/**
 * IUploadProps defines the properties for the CustomUploaderTwo component.
 *
 * @property {('text' | 'picture' | 'picture-card' | 'picture-circle')} listType - Specifies the type of list to display the uploaded files as. Optional.
 * @property {number} maxCount - The maximum number of files that can be uploaded. Optional.
 * @property {(string[] | string)} initialValue - The initial value(s) for the uploader, can be a single string URL or an array of string URLs. Optional.
 * @property {(url: string) => void} onChange - Callback function that is called when the uploaded files change. It receives the URL of the uploaded file. Optional.
 * @property {string[]} acceptedType - Array of accepted file types for upload. This should be a list of MIME types or file extensions. Optional.
 * @property {number} sizeLimit - The maximum file size allowed for uploads, in megabytes (MB). Optional.
 * @property {React.ReactNode} body - Custom body content that can be displayed in the uploader component. Optional.
 * @property {boolean} imageCrop - Specifies whether to enable image cropping. Optional.
 * @property {number} cropRatio
 *
 */
const CustomUploader: React.FC<IUploadProps> = ({
  listType = 'picture-card',
  maxCount = 1,
  initialValue,
  onChange,
  acceptedType = [],
  sizeLimit = 2,
  body,
  imageCrop,
  cropRatio,
  isRemoveIcon = true,
}) => {
  const [messageApi, messageCtx] = message.useMessage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(null);

  useEffect(() => {
    const urls = fileList?.map((item) => item.url) || [];

    if (
      (typeof initialValue === 'string' && urls.includes(initialValue)) ||
      (Array.isArray(initialValue) && initialValue.length && urls.includes(initialValue[0]))
    ) {
      return;
    }

    setFileList(processInitialValue(initialValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const processInitialValue = (initialValue) => {
    if (!initialValue) {
      return [];
    } else if (typeof initialValue === 'string') {
      return [
        {
          uid: '-1',
          name: initialValue,
          status: 'done',
          url: initialValue,
        },
      ];
    } else {
      return initialValue?.map((item, index) => ({
        uid: index.toString(),
        name: item,
        status: 'done',
        url: item,
      }));
    }
  };

  const beforeUpload = (file: RcFile) => {
    const accepted = acceptedType.some((item) => file.name?.endsWith(item));
    if (!accepted) {
      notification.error({
        message: `You can only upload ${acceptedType.join(' / ')} file!`,
        duration: 6,
      });
    }

    const isLimit = file.size / 1024 / 1024 < sizeLimit;
    if (!isLimit) {
      notification.error({
        message: `File size must smaller than ${sizeLimit}MB!`,
        duration: 6,
      });
    }

    return accepted && isLimit;
  };

  const extractUploadedUrls = (fileList) => {
    const files = fileList
      ?.filter((item) => item?.response?.data?.[0]?.url || item?.url)
      .map((item) => item?.response?.data?.[0]?.url ?? item?.url);

    return files.length === 1 ? files?.[0] : files;
  };

  const handleUpload: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'error') {
      messageApi.error('Upload failed');
      const updatedFileList = info.fileList.map((file) =>
        file.uid === info.file.uid ? { ...file, status: 'error' } : file,
      );
      setFileList(updatedFileList as any);
      return;
    }
    const data = info.fileList.map((file) => {
      if (!file?.response && file?.status !== 'uploading' && file?.status !== 'done') {
        return {
          name: file.name,
          uid: file.uid,
          status: 'error',
        };
      }
      return {
        ...file,
        url: file?.response?.data?.[0] || file,
      };
    });
    setFileList(data as any);

    if (data?.every((item) => item?.status === 'done')) {
      onChange(extractUploadedUrls(data));
    }
  };

  return (
    <>
      {messageCtx}
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(null),
          }}
          src={previewImage || ImagePaths.notFound}
          alt=""
          width={100}
          height={100}
        />
      )}
      {imageCrop ? (
        <ImgCrop aspect={cropRatio}>
          <Upload
            name="files"
            listType={listType}
            className="h-[110px]"
            headers={{
              Authorization: `Bearer ${getAuthToken()}`,
            }}
            fileList={fileList}
            maxCount={maxCount}
            onPreview={(v) => {
              if (!v?.response?.data?.[0]?.url && !v?.url) {
                messageApi.error('No preview available');
              }
              const url = v?.response?.data?.[0]?.url || v?.url;
              if (url.endsWith('.pdf')) {
                window.open(url, '_blank');
                return;
              }
              setPreviewImage(url);
              setPreviewOpen(true);
            }}
            action={`${Env.apiUrl}/uploads`}
            beforeUpload={beforeUpload}
            onChange={handleUpload}
            onRemove={(v) => {
              const filteredItems = fileList?.filter((item) => item.uid === v.uid);
              setFileList(filteredItems);
              onChange(extractUploadedUrls(filteredItems));
            }}
          >
            {fileList?.filter((item) => item.status === 'done').length < maxCount ? (
              <>
                {body ? (
                  body
                ) : listType === 'picture-card' ? (
                  <div>
                    <div className="flex justify-center">
                      <AiOutlinePlus />
                    </div>
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                ) : (
                  <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
                )}
              </>
            ) : null}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          name="files"
          showUploadList={{ showRemoveIcon: isRemoveIcon }}
          listType={listType}
          headers={{
            Authorization: `Bearer ${getAuthToken()}`,
          }}
          fileList={fileList}
          maxCount={maxCount}
          onPreview={(v) => {
            if (!v?.response?.data?.[0]?.url && !v?.url) {
              messageApi.error('No preview available');
            }
            const url = v?.response?.data?.[0]?.url || v?.url;
            if (url.endsWith('.pdf')) {
              window.open(url, '_blank');
              return;
            }
            setPreviewImage(url);
            setPreviewOpen(true);
          }}
          action={`${Env.apiUrl}/uploads`}
          beforeUpload={beforeUpload}
          onChange={handleUpload}
          onRemove={(v) => {
            const filteredItems = fileList?.filter((item) => item.uid === v.uid);
            setFileList(filteredItems);
            onChange(extractUploadedUrls(filteredItems));
          }}
        >
          {fileList?.filter((item) => item.status === 'done').length < maxCount && (
            <>
              {body ||
                (listType === 'picture-card' ? (
                  <div>
                    <div className="flex justify-center">
                      <AiOutlinePlus />
                    </div>
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                ) : (
                  <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
                ))}
            </>
          )}
        </Upload>
      )}
    </>
  );
};

export default CustomUploader;
