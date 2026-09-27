SELECT a.id FROM Weather a JOIN Weather b ON b.recordDate=date(a.recordDate,'-1 day') WHERE a.temperature>b.temperature;
