FROM public.ecr.aws/lambda/python:3.10

# Upgrade pip to avoid issues with older versions
RUN pip install --upgrade pip

COPY requirements.txt .
# Install the requirements
# Leverage a cache mount to /root/.cache/pip to speed up subsequent builds.
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt


COPY src/backend/ ${LAMBDA_TASK_ROOT}/backend/


CMD ["backend.main.handler"]