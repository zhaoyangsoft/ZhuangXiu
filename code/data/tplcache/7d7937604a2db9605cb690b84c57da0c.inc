<span><a href="{dede:field name='typeurl'/}">{dede:field name='typename'/}</a>[field:description/]</span>
{dede:sql sql='Select * from zx_arctype where reid=3  ORDER BY id limit 0,10'}
[field:description/]
{/dede:sql}