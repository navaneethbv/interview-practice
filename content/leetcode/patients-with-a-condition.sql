SELECT patient_id, patient_name, conditions FROM Patients
WHERE INSTR(' ' || conditions, ' DIAB1') > 0;
