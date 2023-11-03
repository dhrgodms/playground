import {Box, Button, Flex, FormControl, FormLabel, Input, Textarea, useToast} from "@chakra-ui/react";
import {ArrowUpIcon} from "@chakra-ui/icons";
import React, {useCallback, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const ImageForm = ({tag}) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id:1,
        content_title: "",
        content: "내용!",
        thumbnail: "",
        // tag : 1=글, 2=그림, 3=플레이리스트
        tag:tag,
        likes:0,
        views:0,
    });
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        try {
            axios
                .post('http://ok-archive.com:8080/api/post/add', {
                    userId:formData.user_id,
                    contentTitle: formData.content_title,
                    content: formData.content,
                    thumbnail: formData.thumbnail,
                    // tag : 1=글, 2=그림, 3=플레이리스트
                    tag:formData.tag,
                    likes:0,
                    views:0,
                })
                .then(res => {
                    console.log("res:",res);
                    setFormData({
                        user_id:"",
                        content_title: "",
                        content: "",
                        thumbnail: ""});
                    if (res?.data) {
                        toast({
                            title: `업로드 됐나바`,
                            status: 'success',
                            isClosable: true,
                        });
                        navigate('/');
                    } else {
                        toast({
                            title: `업실`,
                            status: 'error',
                            isClosable: true,
                        });
                    }
                });
        } catch (e) {
            console.error(e);
        }
    }
    const SettingUserThumbnail = () => {
        const inputRef = useRef(null);
        const onUploadImage = useCallback(e => {
            if (!e.target.files) {
                return;
            }
            console.log(e.target.files[0]);

            const formImageData = new FormData();
            formImageData.append('file',e.target.files[0]);
            console.log(formImageData);

            axios.post("http://ok-archive.com:8080/api/post/thumbnail-upload",formImageData,{
                'Content-Type': 'multipart/form-data',
            },)
                .then(response => {
                    console.log(response);
                    setFormData({ ...formData, thumbnail: response.data });
                    console.log(formData.thumbnail);

                })
                .catch(error => {
                    console.error(error);
                });
        }, []);

        const onUploadImageButtonClick = useCallback(() => {
            if(!inputRef.current){
                return;
            }
            inputRef.current.click();
        },[]);

        return(
            <FormControl>
                <Flex gap={'3'} align={'center'}>
                    <Input
                        type="file"
                        onChange={onUploadImage}
                        accept='image/*'
                        ref={inputRef}
                        style={{display:"none"}}
                        name="thumbnail"
                    />
                    <Button size={'sm'} label="이미지업로드" onClick={onUploadImageButtonClick}>+Thumbnail</Button>
                    <Input
                        focusBorderColor="green"
                        size={'sm'}
                        colorScheme={'green'}
                        varient="filled"
                        isReadOnly={true}
                        value={formData.thumbnail}
                    />
                </Flex>
                {/*<Button label="이미지 제거" onClick={onDeleteImage} />*/}
            </FormControl>
        );
    }
    const [fileList, setFileList] = useState(null);

    const handleFileChange = (e) => {
        setFileList(e.target.files);
    };

    const handleUploadClick = () => {
        if (!fileList) {
            return;
        }

        // 👇 Create new FormData object and append files
        const data = new FormData();
        files?.forEach((file, i) => {
            data.append(`file`, file, file.name);
        });
        console.log("data : ",data);
        console.log(files);

        for (let key of data.keys()) {
            console.log(key, ":", data.get(key));
        }

        // 👇 Uploading the files using the fetch API to the server
        axios.post('http://ok-archive.com:8080/api/image/add', data,{
            'Content-Type': 'multipart/form-data',
        },)
            .then((res) => {
                console.log(res);
                console.log(files);
            })
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    // 👇 files is not an array, but it's iterable, spread to get an array of files
    const files = fileList ? [...fileList] : [];


    return (
        <Box my={4} textAlign="left">
            <form
                onSubmit={handleSubmit}
                style={{ flexDirection: 'column', gap: '10px' }}
            >
                <Flex direction={'column'} justify={'center'} gap={'5'}>

                    <FormControl isRequired>
                        <FormLabel>Content Title</FormLabel>
                        <Input
                            focusBorderColor={'green'}
                            placeholder="..OㅅO.."
                            onChange={handleInputChange}
                            name="content_title"
                            value={formData && formData.content_title}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Content</FormLabel>
                        <Textarea
                            focusBorderColor="green"
                            type="text"
                            placeholder="..OㅅO.."
                            onChange={handleInputChange}
                            name="content"
                            value={formData && formData.content}
                        />
                    </FormControl>
                    <SettingUserThumbnail />
                    <div>
                        <input type="file" onChange={handleFileChange} multiple />

                        <ul>
                            {files.map((file, i) => (
                                <li key={i}>
                                    {file.name} - {file.type}
                                </li>
                            ))}
                        </ul>

                        <button type={"button"} onClick={handleUploadClick}>Upload</button>
                    </div>
                    {/*<SettingUploadFiles />*/}
                </Flex>
                <Flex
                    style={{
                        flexDirection: 'column',
                        marginTop: '20px',
                        gap: '10px',
                    }}
                >
                    <Button type="sumbit" colorScheme="yellow">
                        upload <ArrowUpIcon />
                    </Button>
                </Flex>
            </form>
        </Box>
    );
}