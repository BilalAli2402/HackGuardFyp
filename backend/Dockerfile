FROM python:3.8.10

COPY requirement.txt requirement.txt
RUN pip install --no-cache-dir -r requirement.txt

COPY . code
WORKDIR /code

EXPOSE 8081

ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "0.0.0.0:8081"]