import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, TextInput, StyleSheet, Animated,
    Modal, Image, TouchableOpacity, Button
} from 'react-native';
import birthday from '../birthday.jpeg';

const BirthdayCard = () => {
    const [recipient_name, setRecipientName] = useState('');
    const [age, setAge] = useState(0);
    const [sender_name, setSenderName] = useState('');
    const [message, setMessage] = useState('');
    const [showCard, setShowCard] = useState(false);
    const [showStars, setShowStars] = useState(false);
    const starScale = useRef(new Animated.Value(0)).current;
    const spinValue = useRef(new Animated.Value(0)).current;
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handleShowCard = () => {
        setShowCard(true);
        setShowStars(true);
        animateStars();
    }

    const animateStars = () => {
        Animated.timing(starScale, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    };


    //Handle button events
    const handleClose = () => {
        setShowCard(false);
    }

    const handleSubmit = () => {
        handleShowCard();
    }

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const buttonStyles = [
        styles.button,
        isFocused && styles.buttonFocused,
        isHovered && styles.buttonHovered,
    ];

    const handleClearStates =()=>{
        setRecipientName('');
        setSenderName('');
        setMessage('');
        setAge(0);
    }

    return (
        <>
            <View style={styles.container}>

                <Text style={styles.labels}>Recipient Name:</Text>
                <TextInput
                    placeholder="Enter recepient name"
                    style={styles.inputs}
                    value={recipient_name}
                    onChangeText={(text) => setRecipientName(text)} />

                <Text style={styles.labels}>Sender Name:</Text>
                <TextInput
                    placeholder="Enter sender name"
                    style={styles.inputs}
                    value={sender_name}
                    onChangeText={(text) => setSenderName(text)} />

                <Text style={styles.labels}>Message:</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={3}
                    placeholder="Enter message"
                    style={styles.inputs}
                    value={message}
                    onChangeText={(text) => setMessage(text)} />

                <Text style={styles.labels}>Age:</Text>
                <TextInput
                    placeholder="Enter age"
                    style={styles.inputs}
                    value={age}
                    onChangeText={(text) => setAge(text)} />

                <Button
                    title="Create Birthday Card"
                    onPress={handleSubmit}
                    style={styles.button}
                />

                <Button
                    title="Clear Form"
                    onPress={handleClearStates}
                    style={styles.button}
                />
            </View >

            <View style={styles.container}>
                <Modal visible={showCard} onRequestClose={handleClose}>
                    <View style={styles.card}>
                        <Text style={styles.text}>Dear {recipient_name}</Text>
                        <Text style={styles.text}>Happy {age}th Birthday, {recipient_name}!</Text>
                        <Animated.Image
                            source={birthday}
                            style={[styles.image, { transform: [{ rotate: spin }] }]}
                        />
                        <Animated.Text
                            style={[styles.stars, { transform: [{ scale: starScale }] }]}
                        >
                            ⭐⭐⭐
                        </Animated.Text>
                        <Text style={styles.text}>{message}</Text>
                        <Text style={styles.text}>From,</Text>
                        <Text style={styles.text}>{sender_name}</Text>
                        <Button title='Close' onPress={handleClose} style={styles.button} />
                    </View>
                </Modal>
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4b0082',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        color: "#FFFFFF",
    },
    button: {
        backgroundColor: '#f4511e',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 200,
        shadowColor: 'black',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        cursor: 'pointer',
        margin: 40,
        padding: 20,
    },
    buttonFocused: {
        borderColor: 'blue',
        borderWidth: 2,
    },
    buttonHovered: {
        backgroundColor: 'lightgray',
    },
    card: {
        flex: 1,
        width: 350,
        height: 500,
        backgroundColor: '#4b0082',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stars: {
        fontSize: 50,
    },
    inputs: {
        width: 300,
        height: 30,
        backgroundColor: "#dda0dd",
    },
    labels: {
        color: "#FFFFFF",
    },
});

export default BirthdayCard;