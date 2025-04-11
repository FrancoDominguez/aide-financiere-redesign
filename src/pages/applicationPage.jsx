import TextField from "@mui/material/TextField";

export default function ApplicationPage() {
  return (
    <div>
      <div className="text-center text-3xl text-[#263652] font-bold">
        <h1>Loans and Bursaries</h1>
        <h1>Full-Time Studies Application</h1>
      </div>

      <div className="w-full m-auto max-w-[400px]">
        <h1 className="mt-4 text-lg text-[#263652] font-bold">Personal Information</h1>
        <TextField
          label="Full Name"
          size="small"
          fullWidth
          sx={{
            mt: 1.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
        />
        <TextField
          label="Social Insurance Number"
          size="small"
          fullWidth
          sx={{
            mt: 1.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
        />
        <TextField
          label="Address"
          size="small"
          fullWidth
          sx={{
            mt: 1.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
        />
        <TextField
          label="Telephone Number"
          size="small"
          fullWidth
          sx={{
            mt: 1.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
        />
        <TextField
          label="Date of Permanent Residence Status"
          size="small"
          fullWidth
          sx={{
            mt: 1.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
        />
      </div>
    </div>
  );
}
