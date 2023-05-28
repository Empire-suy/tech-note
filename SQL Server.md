## SQL Server

### 数据库

```sql
use db  -- 切换数据库
```

#### 创建

```sql
if exists(select * from sys.databases where name = 'dbname')
drop database dbname

create database testdb01
on primary (
name=testdb01,
filename='E:\Data\Microsoft SQL Server\Databases\testdb\testdb01.mdf',
size=10MB,
maxsize=100MB,
filegrowth=5MB
)
log on (
name=testdb01_log,
filename='E:\Data\Microsoft SQL Server\Databases\testdb\testdb01.ldf',
size=10MB,
maxsize=100MB,
filegrowth=5MB
)

-- name  逻辑文件名称
-- filename 路径需要先创建，否则无法创建文件
-- size 数据库初始大小
-- maxsize 数据库最大空间
-- filegrowth 数据库自动增长大小
```

##### 修改

```sql
-- 查看数据信息
exec sp_helpdb testdb01;

-- 修改数据库名称
alter database testdb01
modify name = testdb;

-- 修改数据库信息
alter database testdb
modify file (
name=testdb01,  -- 逻辑文件名称不能修改
size=20MB,
maxsize=50MB,
filegrowth=10MB
);

-- 删除数据库
drop database testdb;
```

### 数据库表

#### 创建

```sql
if exists(select * from sys.objects where name = tbname and type = 'U')
drop table tbname;

create table userinfo (
ID int primary key not null,
name varchar(20) not null,
age int null
)


identity(1, 1) -- 自动正常 初始值为1，步长为1
-- 建表的时候如果是关键字 需要使用中括号括起来

default(defaultValue)  -- 设置默认值
check(key=value1 or key=value2)  -- 设置约束
references db(key)  -- 引用外键
unique  --唯一约束
```

#### 数据类型

```sql
char(len) -- 定长数据类型

varchar(len)   -- 可变长度数据类型

text     -- 长文本

-- text, char, varchar 前面加n表示存储的是Unicode编码 对中文友好
-- nvarchar(100)     可存储100个字母或100个汉字
```



```sql
CONVERT(dataType(length), data2convert, styel/id) -- 第一个参数是要转换的数据格式，第二个参数是要转化的文本，第三个参数是转换的日期样式传入对应的样式id

ISNULL(需要判断的值，处理值) -- 第一个参数是判断是否为空的值，第二个是当第一个参数为空的时候转换的值

STUFF(列名, 开始位置, 长度, 替换字符串); -- 开始位置从1开始计数

DATEDIFF(type, start, end) -- 计算时间间隔
DATEADD(type, diff, date)  -- 时间操作 diff 为负数的时候时间做减法

FOR XML PATH -- 结果转换为XML格式
```

#### 修改

```sql
-- 新增字段
alter table 表名
add 字段 类型 约束

-- 删除字段
alter table 表名
drop column 列名

-- 修改字段类型 约束
alter table tableName
alter column 字段名 字段类型 not null[非空约束]

-- 设置主键
alter table 表名
add constraint 主键名 primary key(字段名)

-- 修改字段名
exec sp_rename '表名.字段名', '新的字段名', 'COLUMN'

-- 删除表
drop table 表名

-- 维护约束
-- 添加约束

-- 1.外键约束
alter table 从表名
add constraint 约束名 foreign key (从表字段名) references 主表名(主表关联字段)

-- 2.添加check约束
alter table tbname
add constraint 约束名 check(check约束);

-- 3.主键约束
alter table 表名
add constraint 约束名 primary key(列名)

-- 4.唯一约束
alter table tbname add constraint 约束名 unique(列名)

-- 5.默认约束
alter table tbname add constraint 约束名 default defaultValue for 列

-- 删除约束
alter table 表名
drop constraint 约束名
```

#### 注释

```sql
--字段注释处理
--添加dbo下的userTest表的userName字段注释为"用户名"
execute sp_addextendedproperty 'MS_Description','用户名','SCHEMA','dbo','table','userTest','column','userName';
--修改dbo下的userTest表的userName字段注释为"xxx"
execute sp_updateextendedproperty 'MS_Description','xxx','user','dbo','table','userTest','column','userName';
--删除dbo下的userTest表的userName字段注释
execute sp_dropextendedproperty 'MS_Description','user','dbo','table','userTest','column','userName';

---表注释处理
-- 添加dbo下的userTest表注释为"用户信息测试表"
execute sp_addextendedproperty 'MS_Description','用户信息测试表','user','dbo','table','userTest',null,null;
-- 修改dbo下的userTest表注释为"xxxxx"
execute sp_updateextendedproperty 'MS_Description','xxxxx','user','dbo','table','userTest',null,null;
-- 删除dbo下的userTest表注释
execute sp_dropextendedproperty 'MS_Description','user','dbo','table','userTest',null,null;

```

#### 查看表结构和说明

```sql
SELECT
     表名       = Case When A.colorder=1 Then D.name Else '' End,
     表说明     = Case When A.colorder=1 Then isnull(F.value,'') Else '' End,
     字段序号   = A.colorder,
     字段名     = A.name,
     字段说明   = isnull(G.[value],''),
     标识       = Case When COLUMNPROPERTY( A.id,A.name,'IsIdentity')=1 Then '√'Else '' End,
     主键       = Case When exists(SELECT 1 FROM sysobjects Where xtype='PK' and parent_obj=A.id and name in (
                      SELECT name FROM sysindexes WHERE indid in( SELECT indid FROM sysindexkeys WHERE id = A.id AND colid=A.colid))) then '√' else '' end,
     类型       = B.name,
     占用字节数 = A.Length,
     长度       = COLUMNPROPERTY(A.id,A.name,'PRECISION'),
     小数位数   = isnull(COLUMNPROPERTY(A.id,A.name,'Scale'),0),
     允许空     = Case When A.isnullable=1 Then '√'Else '' End,
     默认值     = isnull(E.Text,'')
 FROM
     syscolumns A
 Left Join
     systypes B
 On
     A.xusertype=B.xusertype
 Inner Join
     sysobjects D
 On
     A.id=D.id  and D.xtype='U' and  D.name<>'dtproperties'
 Left Join
     syscomments E
 on
     A.cdefault=E.id
 Left Join
 sys.extended_properties  G
 on
     A.id=G.major_id and A.colid=G.minor_id
 Left Join
 
 sys.extended_properties F
 On
     D.id=F.major_id and F.minor_id=0
     where d.name='books'    --如果只查询指定表,加上此条件
 Order By
     A.id,A.colorder

```

#### 临时表

```
select * from tempdb..sysobjects where id=object_id('tempdb..#temp') AND type = 'U'
```



#### 操作数据

```sql
-- 插入单行数据
insert into 表名 (字段1, 字段2...) values (值1, 值2...)

-- 插入多行数据
insert into 表名 (字段1, 字段2...) values (值1, 值2...), (值1, 值2...)...

-- 复制数据
insert into 表名 (字段1, 字段2...) values select 字段3, 字段4 from 表名 where ...


-- 查询
select top 5 * from 表名 -- 查询前面5条
select top 10 percent from 表名 -- 查询10%的数据

select distinct 字段 from 表名 -- 将查出的字段去重

-- 查询最后的 倒序再进行获取前面的

-- 修改表记录
update 表名 set 字段 = 值 where 条件

-- 删除表记录
delete from 表名 where 条件

truncate table tbname  -- 清空数据 表结构依然存在


-- 条件限制where
-- 精确限制条件
where 字段 = 值

-- 模糊限制条件
where 字段 like '%值%'  -- 查询包含值的记录

-- _值         前面只有一个字符
-- []          查询在范围内的数据
-- [^]         查询不在范围内的数据

-- 范围查询
select * from tablename [not] between con1 and con2  -- 可以使数字、字符串、时间日期   GETDATE()

-- in
select * from tablename [not] in (v1, v2...)

-- exists 判断a表中的数据是否存在b表查询结果中 如果存在返回true 否则返回false
select * from table1 as a where exists (select * from table2 as b where a.id = b.id)


-- 排序 
select * from table1 order by id asc[desc] -- 根据id进行排序 可以多个字段进行排序


-- 关联查询
-- inner join [保留公共的数据]
-- left join  [保留左边的数据]
-- right join [保留右边的数据]
-- full join [保留两边的数据]   全外连
-- 自连接
-- eg: 
select * from tableName A inner join tableName B on A.id = B.parentId;

-- 聚合函数
-- 返回平均值 忽略null值 必须是数字类型 求和
avg()  sum()

-- 最小值  最大值
min() max()

-- 返回组中的项数 忽略null
count()  count_big()  [当数据量大于2^23 - 1]

len()  -- 返回字符串表达式的字符数
DATALENGTH()  -- 返回表达式的字节数

select rand() -- 随机数
select floor(rand() * N)  -- 返回随机整数 [0, N)
select ceiling(rand() * N)  -- 返回随机整数 (1, N]

-- 时间
select GETDATE()
select GETUTCDATE()

-- 转换时间格式
CONVERT(dataType, data, styleCode) 

DATEDIFF(datepart, startdate, enddate)
DATEADD(datepart, diff, date)

datepart()  -- 返回整型
DATENAME() -- varchar
year()
month()
day()

-- 分组查询
group by 列名
-- 如果有条件需要添加到

-- 普通函数条件写在where 聚合函数的条件写在having
having count(*) > 2


CHARINDEX(exp1, exp2, start_location)  -- 索引从1开始
PARTINDEX(exp1, exp2, start_location)  -- exp1 支持通配符 PARTINDEX('%BC%', 'ABCD') 2

SUBSTRING(exp, start, length)  --截取指定长度的字符串
LEFT(exp, length)  -- 左右截取指定长度的字符串
RIGHT(exp, length)
LTRIM(exp)  -- 去掉左边、右边的空格
RTRIM(exp)
RTRIM(LTRIM(exp))  -- 同时去掉两边的空格
UPPER() LOWER()   -- 大小写转换
REPLACE(exp, str1, str2)  -- 使用str2替换exp中的str1的内容

REPLICATE(exp, num)  -- 重复输出exp num次
SPACE(N)       -- 返回n个空格

REVERSE()  -- 字符串翻转
CAST(exp as data_type)  -- 显式转换数据类型

-- 条件判断 [简单CASE函数和CASE搜索函数]
SELECT

-- 列子
DECLARE @SCORE INT
SET @SCORE = CAST(RAND() * 100 AS INT)

PRINT @SCORE

SELECT
@SCORE,
CASE 
	WHEN @SCORE > 60
	THEN '合格'
	WHEN @SCORE <= 60
	THEN '奖励一份三年高考，五年模拟'
END


DECLARE @SEX INT
SELECT @SEX=ROUND(RAND(), 0)
PRINT @SEX

SELECT
CASE
	WHEN @SEX = 1 THEN '男'
	WHEN @SEX = 0 THEN '女'
END


-- 合并两个或多个select语句的结果集
UNION -- 相同的数据被合并到一起[去重]
UNION ALL -- 将所有的数据合并一起
```

### 数据库设计

#### 三大范式

```sql
-- 1.数据原子性   分字段
-- 2.实体唯一性（记录的唯一性）   分表  中间表
-- 3.字段不能由其他字段派生出来（要求字段没有冗余）
```

#### 变量

```sql
-- 信息打印
print 'hello.sql'
select 'hello.sql'

-- 变量
-- (1) 局部变量:   以@开头，先声明，再赋值
declare @str varchar(20)
set @str = 'hello world'
-- select @str = 'str2'
-- set : 赋值变量指定的值
-- select: 一般用于表中查询出的数据赋值给变量，如果查询结果有多条，取最后一条赋值

-- (2) 全局变量：  以@@开头，由系统进行定义和维护

-- go 
-- 1.等待go语句之前执行完成之后才能执行后面的代码
-- eg:
create table test1
go
use test1;

-- 2.批量处理结束的标志
declare @num int
set @num = 1
go
set @num = 2 -- 报错 需要声明

-- 查看变量的数据类型
SELECT SQL_VARIANT_PROPERTY (ISNULL(@S,''),'BaseType')
```

#### 运算符

```sql
算术运算符：+  -  *   /(整数相除取整，小数相除为小数)  %(模)
逻辑运算符：AND OR LIKE BETWEEN IN EXISTS NOT ALL ANY
--  ALL ANY 函数判断数据需要放在前面
赋值运算符：=
字符串运算符：+
比较运算符：= >  <  >=   <=   <>(不等于)
位运算符：|   &  ^
复合运算符：+=    -=    /=    %=    *=
```

#### 流程控制

```sql
if 条件
begin
end
-- 一行可以省略


case  ... when

-- 值判断
case diny
	when value1 then showValue
	else '异常值'
end


-- 范围判断
case
	when 变量 < 500 then 显示信息
	else 'else值'
end


-- 循环结构 while
while 循环条件
begin
	循环体
end


-- try catch
BEGIN TRY
END TRY
BEGIN CATCH
END CATCH
```

#### 子查询

将查询结果作为另一个查询的元素

#### 分页

```sql
-- 方案一
declare @pageSize int = 5
declare @page int = 1
select top(@pageSize) * from Student
where StuId not in (select top(@pageSize) * (@page - 1)) StuId from Student)


-- 方案二  使用row_number 
declare @pageSize int = 5
declare @page int = 1
select * from 
(select ROW_NUMBER() over(order by StuId) RowId, * from Student) Temp
where RowId between (@page - 1) * @pageSize + 1 and @page * @pageSize
```

#### 事务

数据库操作序列

不可分割的工作单位

恢复和并发控制的基本单位



ACID特性

- 原子性 Atomicity
- 一致性 Consistency
- 隔离性  Isolation
- 持续性 Durability

```sql
begin transaction

declare @error int = 0
update... -- 更新操作
set @error += @@ERROR
update... -- 更新另外一个表
set @error += @@ERROR

if @error > 0
    begin
        rollback transaction
    end
else
    begin
        commit transaction
    end
```

#### 索引

提高检索查询效率

按照存储结构分：聚集索引（每个表只有一个聚集索引）、非聚集索引

```sql
-- 索引创建方式
-- 1.显式创建索引
CREATE [UNIQUE] [CLUSTERED] [NONCLUSTERED]
INDEX <index name> ON <table or view name>(<column name>[ASC|DESC][,...n])
with(...)   -- 还有很多参数

-- 查看索引
select * from sys.indexes where name = <index name>

-- 删除索引
drop index <index name> on <table name>

-- 使用索引查询
select * from Student with(index = <index name>)

-- 2.隐式创建
-- 主键约束(聚集索引)
-- 唯一约束(唯一索引)
```

#### 视图

```sql
-- 创建视图
create view <view name>
as
	sql 查询语句
go


-- 删除视图
drop view <view name>

-- 使用视图
select * from <view name>
```

#### 游标

- 静态游标（static）：操作游标的时候，数据发生变化，游标中的数据不变
- 动态游标（dynamic）：数据发生变化，游标的数据改变【默认】
- 键值驱动游标（keySet）：被标识的列发生改变，游标的数据改变；其他列变化，游标中的数据不变

```sql
declare <cursor> cursor scroll   -- scroll 滚动游标 可以前进，后退  没有scroll 游标只能向下移动
for select <col> from <table>

-- 打开游标
open <cursor>

-- 提取数据
fetch first from <cursor name>
fetch last from <cursor name>
fetch absolute 2 from <cursor name>   -- 提取第二行
fetch relative 2 from <cursor name>   -- 当前行下移两行
fetch next from <cursor name>   -- 下移一行
fetch prior from <cursor name>  -- 上移一行

-- 提取游标存入变量
declare @acc varchar(20)
fetch absolute form <cursor name> into @acc
print @acc

-- 遍历游标
fetch absolute 1 from <cursor name>
while @@fetch_status = 0   -- 全局变量 0：成功   -1：失败   -2：不存在
begin
	print '提取成功'
	fetch next from <cursor name>
end


-- 更新操作
select * from Member
fetch absolute 2 from mycur
update Member set Pwd = 123 where current of mycur

-- 关闭游标
close <cursor>
-- 删除游标
deallocate <cursor>


-- 多列游标
declare mulCur cursor scroll
for select name, pwd, nickname from Member

declare @name varchar(50)
declare @pwd varchar(50)
declare @nickname varchar(50)

fetch absolute 1 from mulCur into @name, @pwd, @nickname
while @@fetch_status = 0
begin
	print'提取成功'
	fetch next from mulCur into @name, @pwd, @nickname
end

```

#### 函数

分类

- 系统函数
- 自定义函数
  - 标量值函数（返回单个值）
  - 表值函数

1.变量值函数

```sql
-- 求银行的金额总和
create function fn_getTotalMoney()
returns total
as
begin
	declare @totalMoney money
	select @totalMoney = (select sum(CardMoney) from BankCard)
	return @totalMoney
end

select dbo.fn_getTotalMoney()

-- 传入账号编号，返回账户真实姓名
create function fn_getRealName(@aaccid int)
return varchar(50)
as
begin
	declare @name varchar(50)
	select @name = (select RealName from AccountInfo where AccountId = @accid)
	return @name
end

select dbo.fn_getRealName(1)
```

2.表值函数

```sql
-- 标准写法
create function fn_getRecordWithTime(@start varchar(30), @end varchar(30))
returns @record table
(
	CarNo varchar(30),
	RealName varchar(30),
	ExchangeMoney money,
	ExchangeTime smalldatetime
)
as
begin
	insert into @record
		select CarNo 卡号, RealName 姓名,
			case
				when MoneyIn > 0 then '+' + cast(MoneyIn as varchar(30))
				else '-' + cast(MoneyOut as varchar(30))
			end 交易金额,
			ExchangeTime 交易时间
		from CardExchange
		inner join BankCard
		on CardExchange.CarNo = BankCard.CardNo
		inner join AccountInfo
		on AccountInfo.AccountId = BankCard.AccountId
		where ExchangeTime between @start + ' 00:00:00' and @end + ' 23:59:59'
	return
end

--  简练写法   函数体内只能return + 查询语句
create function fn_getRecordWithTime(@start varchar(30), @end varchar(30))
returns table
as
	return
		select CarNo 卡号, RealName 姓名,
			case
				when MoneyIn > 0 then '+' + cast(MoneyIn as varchar(30))
				else '-' + cast(MoneyOut as varchar(30))
			end 交易金额,
			ExchangeTime 交易时间
		from CardExchange
		inner join BankCard
		on CardExchange.CarNo = BankCard.CardNo
		inner join AccountInfo
		on AccountInfo.AccountId = BankCard.AccountId
		where ExchangeTime between @start + ' 00:00:00' and @end + ' 23:59:59'
go
```

#### 触发器

```sql
-- 创建触发器
create trigger trigger_name on table instead of/after insert/update/delete
-- instead of  sql执行前判断   after sql执行之后[for 触发器作用同效]
-- insert/update/delete sql的操作
as
	-- 将要操作的对象inserted, deleted
	-- 更新数据 先删除原来的数据，然后插入新的数据
	-- sql 
go

-- 修改触发器
alter trigger trigger_name on table
for

-- 删除触发器
drop trigger trigger_name

-- 触发器存储的表格
select * from sys.triggers
```

#### 存储过程

SQL语句和流程控制语句的预编译集合

```sql
-- 创建
-- 1.无参数
create proc proc_name
as
sql 语句
go

-- 2.有参数
create proc proc_name
@money money
... -- 其他参数
as
-- sql
go

-- 3.有返回值 (存储过程必须返回整数)
create proc proc_name
@money money
... -- 其他参数
as
-- sql
	if @@ERROR <> 0
		return -1
go


-- 4.有输入参数，输出参数的存储过程
-- 需求，求指定时间的交易记录、存款总金额、取款总金额
drop proc if exists proc_exChange
go
create proc proc_exChange
	@start varchar(20),
	@end varchar(20),
	@sumIn money output,
	@sumOut money output
as
	select @sumIn = sum(MoneyIn) from CardExchange where ExchangeTime between @start + ' 00:00:00' and @end + ' 00:00:00'
	select @sumOut = sum(MoneyIn) from CardExchange where ExchangeTime between @start + ' 00:00:00' and @end + ' 00:00:00'
	select CardExchange.CarNo 卡号, RealName 姓名, AccountInfo.AccountCode 身份证, OpenTime 开户时间, MoneyIn 存入金额, MoneyOut 取出金额 from CardExchange
	inner join BankCard
		on BankCard.CardNo = CardExchange.CarNo
	inner join AccountInfo
		on AccountInfo.AccountId = BankCard.AccountId
	where ExchangeTime between @start + ' 00:00:00' and @end + ' 00:00:00' 
go

declare @sumIn money
declare @sumOut money
exec proc_exChange '2021-01-01', '2021-12-12', @sumIn output, @sumOut output
select @sumIn 存入总金额, @sumOut 取出总金额


-- 5.同时具有输入输出功能的参数
-- 需求  密码升级 传入卡号和秘密 卡号正确，密码长度<8 自动升级到8位密码，并将密码返回

drop view if exists view_rand
go
-- 创建rand函数的视图 函数中不能直接使用rand函数
create view view_rand
as
	select RAND() randNum
go



drop function if exists fn_randInt
go
-- 返回指定返回的随机整数
create function fn_randInt(@start int, @end int)
returns int
as
begin
	declare @num float
	select @num = randNum from view_rand
	return floor(@num * (@end + 1 - @start) + @start)
end



drop proc if exists proc_upgradePwd
go
-- 升级密码存储过程
create proc proc_upgradePwd
	@cardNo varchar(30),
	@pwd varchar(20) output
as
	if not exists(select * from BankCard where CardNo = @cardNo and CardPwd = @pwd)
		set @pwd  = null
	else
	begin
		declare @len int = len(@pwd)
		declare @diff int = 8 - @len

		if @len < 8
		
		begin
			set @pwd = @pwd + cast(dbo.fn_randInt(power(10, @diff - 1) - 1, power(10, @diff) - 1) as varchar)
			print @pwd
			update BankCard set CardPwd  = @pwd where CardNo = @cardNo
		end
	end
go


declare @pwd varchar(20) = '25'
exec proc_upgradePwd '62552455646466344560', @pwd output
select @pwd 新密码


-- 删除
drop proc proc_name 

-- 执行
exec proc_name
-- 有参数
exec proc_name 参数1, 参数 2
-- 返回值
declare @res int
exec @res = proc_name 参数1, 参数 2
select @res
```

