from model import *
from fastapi import HTTPException
import json
with open("employee_details.json","r") as f:
    emp_dict = json.load(f)


emp = [Employee(**data)  for data in emp_dict]
