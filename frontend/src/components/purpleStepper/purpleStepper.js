import React from "react";
import { Stepper,Step,StepLabel } from "@mui/material";
import {styled} from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PropTypes from 'prop-types';
import "./purpleStepper.css"

const PurpleConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:'#8367D8',
    },
  }));
  
  const PurpleStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: '#FFFFFF',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#8367D8',
    }),
    '& .PurpleStepIcon-completedIcon': {
      width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: '#8367D8',
    },
    '& .PurpleStepIcon-circle': {
      width: 16,
      height: 16,
      borderRadius: '50%',
      border:'1px solid #8367D8',
      backgroundColor: 'currentColor',
    },
  }));
  
  function PurpleStepIcon(props) {
    const { active, completed, className } = props;
  
    return (
      <PurpleStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <div className="PurpleStepIcon-completedIcon"/>
        ) : (
          <div className="PurpleStepIcon-circle" />
        )}
      </PurpleStepIconRoot>
    );
  }
  
  PurpleStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };

  function PurpleStepper({current,numberOfSteps,stepperClass}){
    const steps = Array.from({length: numberOfSteps}, (_, i) => i + 1);
        return (
          <div className="stepperContainer">
            <div className={stepperClass}>
                 <Stepper alternativeLabel activeStep={current} connector={<PurpleConnector/>}>
        {steps.map( (index) => {
            return <Step key={index}>
            <StepLabel StepIconComponent={PurpleStepIcon}></StepLabel>
          </Step>
         })}
      </Stepper>
            </div>
            </div>
        )
    }

  export default PurpleStepper;