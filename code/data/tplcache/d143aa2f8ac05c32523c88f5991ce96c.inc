<dt>  
        <strong>{dede:field.typename/}</strong>  
           {dede:field name=description function=html2text(@me)/}
    </dt>  
    <dd>  
    <ul class="d1 ico3">  
    {dede:arclist titlelen='60' row='8' orderby='pubdate' idlist=''}  
    <li> [field:description function="cn_substr(@me)'/]</li>  
    {/dede:arclist}  
    </ul>  
    </dd>