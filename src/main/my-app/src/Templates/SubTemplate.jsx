import React, {Children, useEffect, useState} from 'react';
import {
    Flex,
    Stack,
    Code,
    useDisclosure,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, IconButton
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {PageTitle} from "../Atoms/PageTitle";
import {DeleteIcon, HamburgerIcon} from "@chakra-ui/icons";
import axios from "axios";


const SubSlider = () => {
    const [mainPostsdata, setMainPostsdata] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    useEffect(() => {
        axios.get(`http://ok-archive.com:2023/api/post/main-posts`).then(response => {
            console.log(response.data);
            setMainPostsdata(response.data);
            setIsLoaded(true);
        }).catch(error=>console.log(error));
    },[]); // slider에도 반영해주어야함

    return (
        <><Flex m={'5'} width={"full"} justify={"space-between"}>
                <IconButton ref={btnRef} icon={<HamburgerIcon/>} colorScheme="green" onClick={onOpen}  aria-label={'hambuger'}/>
        </Flex>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Welcome to Haeeun.zip</DrawerHeader>


                    <DrawerBody>
                        <Flex direction={'column'} gap={'1.5em'}>
                            <Input placeholder="Type here..." />
                            <Button
                                ref={btnRef}
                                colorScheme="teal"
                                variant={'ghost'}
                                onClick={() => navigate('/')}
                            >
                                메인으로
                            </Button>
                            <Button
                                ref={btnRef}
                                colorScheme="red"
                                variant={'ghost'}
                                onClick={() => navigate(`/post/${mainPostsdata[0]?.id}`)}
                            >
                                인기글
                            </Button>
                            <Button
                                ref={btnRef}
                                colorScheme="teal"
                                variant={'ghost'}
                                onClick={() => navigate(`/post/${mainPostsdata[1]?.id}`)}
                            >
                                최신글
                            </Button>
                            <Button
                                ref={btnRef}
                                colorScheme="green"
                                variant={'ghost'}
                                onClick={() => navigate(`/writes`)}
                            >
                                생각글
                            </Button>
                            <Button
                                ref={btnRef}
                                colorScheme="green"
                                variant={'ghost'}
                                onClick={() => navigate(`/toons`)}
                            >
                                일상만화
                            </Button>
                            <Button
                                ref={btnRef}
                                colorScheme="green"
                                variant={'ghost'}
                                onClick={() => navigate(`/lists`)}
                            >
                                내가 듣는 플레이리스트(Playlist)
                            </Button>
                            <Button
                                ref={btnRef}
                                colorScheme="pink"
                                variant={'ghost'}
                                onClick={() => navigate('/guestbook')}
                            >
                                어서오세요 방명록
                            </Button>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};
const SubTemplate = ({children,pageTitle,titleQuery}) => {


    return (
        <>
            <Flex direction={"column"} align={'center'}>
                <Flex width={'95vw'}>
                    <SubSlider/>
                </Flex>
                <Flex
                    direction={'column'}
                    gap={'30px'}
                    m={5}
                    width={'70vw'}
                    justify={'center'}
                >
                    <PageTitle title={pageTitle} query={titleQuery}/>
                    {Children.toArray(children)}
                </Flex>

            </Flex>
        </>
    );
};

export default SubTemplate;