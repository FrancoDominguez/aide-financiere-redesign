import { useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const textFieldConfig = [
  {
    title: 'Personal Information',
    fields: [
      {
        type: 'input',
        label: "Full Name",
        placeholder: "Enter your full name",
      },
      {
        type: 'input',
        label: "Social Insurance Number",
        placeholder: "Enter your social insurance number",
      },
      {
        type: 'input',
        label: "Address",
        placeholder: "Enter your address",
      },
      {
        type: 'input',
        label: "Telephone Number",
        placeholder: "Enter your telephone number",
      },
      {
        type: 'input',
        label: "Date of Permanent Residence Status",
        placeholder: "Enter date of permanent residency",
      }
    ]
  },
  {
    title: 'Residence in Québec',
    description: 'The information provided in this section will enable us to determine whether or not you are a Québec resident or deemed a Québec resident. Your answers must accurately describe your situation.',
    fields: [
      {
        type: 'toggle',
        label: "Were you born in Quebec?",
        value: 'bornInQc',
        options: ['Yes', 'No']
      },
      {
        type: 'toggle',
        label: "Does one of your parents (or your sponsor) reside in Quebec?",
        value: 'parentResideInQuebec',
        options: ['Yes', 'No']
      }
    ]
  },
  {
    title: 'Educational Information',
    fields: [
      {
        type: 'input',
        label: "Educational Institution Code",
        placeholder: "Enter your institution code",
      },
      {
        type: 'input',
        label: "Program Code",
        placeholder: "Enter your program code",
      },
      {
        type: 'input',
        label: "Number of Course Hours",
        placeholder: "Enter your course hours",
      },
      {
        type: 'input',
        label: "Number of Credits",
        placeholder: "Enter your number of credits",
      },
      {
        type: 'toggle',
        label: "Will you be doing full-time studies?",
        value: 'fulltimeStudies',
        options: ['Yes', 'No']
      },
      {
        type: 'toggle',
        label: "Did you or will you reside at your parents' or sponsor's residence?",
        value: 'liveWithParent',
        options: ['Yes', 'No']
      }
    ]
  },
];

export default function ApplicationPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alignments, setAlignments] = useState({});

  const handleAlignment = (key) => (event, newValue) => {
    setAlignments(prev => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleNext = () => {
    if (currentIndex < textFieldConfig.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div className="text-center text-3xl text-[#263652] font-bold">
        <h1>Loans and Bursaries</h1>
        <h1>Full-Time Studies Application</h1>
      </div>

      <div className="w-full m-auto max-w-[400px] mb-9">
        <h1 className="mt-4 text-lg text-[#263652] font-bold">{textFieldConfig[currentIndex].title}</h1>
        <h1 className="mt-2 text-base text-[#263652] font-bold opacity-70">{textFieldConfig[currentIndex].description}</h1>
        {textFieldConfig[currentIndex].fields.map((field, index) => {
          if (field.type === 'input') {
            return (
              <TextField
                key={`field-${field.label}-${index}`}
                label={field.label}
                placeholder={field.placeholder || ''}
                size="small"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  mt: '20px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    height: 56,
                  },
                  '& .MuiInputBase-input': {
                    padding: '20px 24px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              />
            );
          }

          if (field.type === 'toggle') {
            return (
              <div
                key={`field-${field.label}-${index}`}
                className="flex justify-between items-center mt-6"
              >
                <h1 className="text-lg text-[#263652]">{field.label}</h1>
                <ToggleButtonGroup
                  value={alignments[field.value] || null}
                  exclusive
                  onChange={handleAlignment(field.value)}
                >
                  {field.options.map((option, idx) => (
                    <ToggleButton
                      key={idx}
                      value={option.toLowerCase()}
                      aria-label={option}
                      sx={{
                        height: '56px',
                        borderRadius: '8px',
                        textTransform: 'none',
                        px: 3,
                      }}
                    >
                      <span className="capitalize">{option}</span>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </div>
            );
          }

          return null; // fallback
        })}
      </div>

      <div className="fixed left-0 bottom-0 bg-white w-full text-black p-6 border-t border-t-gray-200 z-[900]">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto">
          <Button
            onClick={handlePrevious}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              visibility: currentIndex === 0 ? 'hidden' : 'visible',
              width: 136,
              color: '#263652',
              borderColor: '#263652',
              borderRadius: '999px',
              textTransform: 'none',
              px: 3,
              py: 1,
              fontWeight: 600,
              '&:hover': {
                borderColor: '#1e2a45',
                backgroundColor: '#f0f4ff',
              },
            }}
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              width: 136,
              color: '#263652',
              borderColor: '#263652',
              borderRadius: '999px',
              textTransform: 'none',
              px: 3,
              py: 1,
              fontWeight: 600,
              '&:hover': {
                borderColor: '#1e2a45',
                backgroundColor: '#f0f4ff',
              },
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
