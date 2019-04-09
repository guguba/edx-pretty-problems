let edxText = 
    '<problem>\n' + 
    '<customresponse cfn="check_function">\n'+

    '<script type="loncapa/python">\n'+
    '<![CDATA[\n'+
    'import json\n'+
    'def check_function(e, ans):\n'+
      'response = json.loads(ans)\n'+
      'answer = response["answer"]\n'+
      'return answer == "correct"\n'+

    ']]>\n'+
   ' </script>\n'+

          '<jsinput\n'+
            'gradefn="try1.getGrade"\n'+
            'width="600"\n'+
            'height="100"\n'+
            'html_file="/static/try1.html"\n'+
            'title="Dropdown with Dynamic Text"\n'+
            'sop="false"/>\n'+
        '</customresponse>\n'+
    '</problem>'

export default edxText;