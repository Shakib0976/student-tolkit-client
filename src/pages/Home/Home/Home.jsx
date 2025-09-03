import React from 'react';
import Banner from '../Banner/Banner';
import FeatureHighlights from '../Feature/FeatureHighlights';
import Timer from '../PomodoroTimer/Timer';
import BrainBoost from '../BrainBost/Brainbost';
import SmartReminder from '../SmartReminder/Reminder';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeatureHighlights />
            <SmartReminder></SmartReminder>
        </div>
    );
};

export default Home;