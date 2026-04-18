from fastapi import FastAPI,HTTPException,Request,Response
from fastapi.responses import PlainTextResponse
import logging
import time
import datetime
import asyncio

from employee_data import emp
import employee_data 
#from employee_data import *
from employee_data import Employee
from model import StatusResponse
from employee_data import Project
from employee_data import LoginRequest

app = FastAPI(title="Welcome to FastAPI")


logging.basicConfig(level=logging.INFO,format="%(message)s-%(levelname)s-%(asctime)s")


@app.get("/",response_class=PlainTextResponse)
async def getData():
    return "welcome to fastapi"

@app.get("/employees",response_model = list[Employee])
async def getEmployees():
    return emp
@app.get("/employees/bench",response_model=list[Employee])
async def get_bench_employee():
    bench_employee = []
    for bench in emp:
        if not bench.projects:
            bench_employee.append(bench)
    return bench_employee

@app.get("/employees/salary",response_model=list[Employee])
async def get_salary_employee():
    salary_emp =[]
    for s in emp:
        if s.salary<50000:
            salary_emp.append(s)
    return salary_emp        
@app.get("/employees/NoProject/salary",response_model=list[Employee])
async def get_noproject_salary():
    NoProject = []
    for ps in emp:
        if ps.salary<50000 and not ps.projects:
            logging.info("data found")
            NoProject.append(ps)
    return NoProject    

@app.post("/login")
async def login(data:LoginRequest):
    if data.username == "Mani":
        if data.password == "Mani@123":
            return {"successfully login"}
        else:
            return {"incorrect password"}
    else:
        return {"incorrect username"}  

@app.get("/employees/status",response_model=list[Project])
async def get_status():
    proj_status=[]
    for ep in emp:
        for sta in ep.projects:
            if sta.status == "Completed":
                proj_status.append(sta)
    return proj_status        

@app.get("/employees/get_status/{state}",response_model=StatusResponse)
async def getData(state:str):
    
    list_any = []
    list_project = []
    for e in emp:
        hash_match = False
        for p in e.projects:
            if p.status.lower() == state.lower():
                list_project.append(p)
                hash_match = True
        if hash_match: 
            list_any.append(e)                  
    return StatusResponse(employees=list_any,projects=list_project)


    


@app.get("/employees/{statu}",response_model = list[Employee])
async def get_status_any(statu:str):
    list_any = []
    for e in emp:
        for p in e.projects:
            if p.status == statu:
                list_any.append(e)
    return list_any            


@app.get("/employees/get_id/{id}",response_model=list[Employee])
async def get_employee(id:str):
        #return [emp for p in emp if any(i.project_id == id for i in emp.projects)]
        #return any(i.project_id == id  for i in e.projects)
        list_app = []
        for e in emp:
           if any( p.project_id == id for p in e.projects): 
               list_app.append(e) 
        return list_app                

    
@app.get("/good")
async def get_Good():
    start = datetime.datetime.now()
    await asyncio.sleep(10)
    end = datetime.datetime.now()
    duration = (end - start).total_seconds()

    return {
        "status":"async",
        "start":start,
        "end":end,
        "duration":duration,

    }
@app.get("/bad")
async def get_Good():
    start = datetime.datetime.now()
    time.sleep(10)
    end = datetime.datetime.now()
    duration = (end - start).total_seconds()

    return {
        "status":"async",
        "start":start,
        "end":end,
        "duration":duration,

    }