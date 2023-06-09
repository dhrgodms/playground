import React from 'react';
import LoginForm from "../Articles/LoginForm";
import {Box, Flex, Heading} from "@chakra-ui/react";

const LoginPage = () => {
    return (
        <Flex justify={'center'}>
        <Box>
            <LoginForm />
        </Box>
        </Flex>
    );
};

export default LoginPage;