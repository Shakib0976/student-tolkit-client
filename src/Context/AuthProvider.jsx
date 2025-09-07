import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/Firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    // lasing 
    const [loading, setLoading] = useState(true);
    // logged user
    const [user, setUser] = useState(null);

    console.log(user);


    // update user 
    const updateUser = (updateData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateData)
    }

    //  provider with google login
    const provider = new GoogleAuthProvider();




//  user create
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


//  real time user check
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe()
        }
    }, []);

//    user login
    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }


    // google sign in
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)

    };


    const userInfo = {
        createUser,
        googleSignIn,
        loading,
        setLoading,
        user,
        setUser,
        updateUser,
        logInUser





    }


    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
