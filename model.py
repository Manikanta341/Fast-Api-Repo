from pydantic import BaseModel

class Project(BaseModel):
    project_id:str
    name:str
    status:str
    
class Employee(BaseModel):
    emp_id:str
    name:str
    department:str
    salary:int
    designation:str
    location:str
    dob:str
    projects:list[Project]  

class StatusResponse(BaseModel):
    employees:list[Employee]
    projects:list[Project]

class LoginRequest(BaseModel):
    username:str
    password:str
