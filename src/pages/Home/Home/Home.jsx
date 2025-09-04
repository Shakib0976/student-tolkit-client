import React from 'react';
import Banner from '../Banner/Banner';
import FeatureHighlights from '../Feature/FeatureHighlights';
import Timer from '../PomodoroTimer/Timer';
import BrainBoost from '../BrainBost/Brainbost';
import SmartReminder from '../SmartReminder/Reminder';
import Marque from '../MarqueSection/Marque';
import StudentBenefits from '../Benifit/StudentBenefits';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeatureHighlights />
            <StudentBenefits></StudentBenefits>
            <SmartReminder></SmartReminder>
            <Marque></Marque>


        </div>
    );
};

export default Home;