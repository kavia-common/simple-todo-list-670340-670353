#!/bin/bash
cd /tmp/kavia/workspace/code-generation/simple-todo-list-670340-670353/todo_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

