import './header.css'
import React, {useState, useRequest} from 'react'
import axios from 'axios'
import Pagination from '@mui/material/Pagination';

export function Header () {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [repos, setRepos] = useState([]);
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [reposPerPage] = useState(4);

    const lastRepoIndex = currentPage * reposPerPage;
    const firstRepoIndex = lastRepoIndex - reposPerPage;
    const currentRepo = repos.slice(firstRepoIndex, lastRepoIndex)
    
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const Pagination = ({reposPerPage, totalRepos, paginate}) => {
        const pageNumbers = []

        for (let i = 1; i<= Math.ceil(totalRepos/reposPerPage); i++) {
            pageNumbers.push(i)
        }

        return (
            <div className='paginate-bar'>
                
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li className='page-list' key={number}>
                            <a href="!#" className="page-link" onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))}
                </ul>
                
            </div>
        )
    }
    function EmptyState() {
        return (
            <h1>User not found</h1>
        )
    }
    async function searchRepos() {
        /* const pageRepoNumbers = []
        for (let i = 5; i>= Math.ceil(1); i--) {
            pageRepoNumbers.push(i)
        } */
       /*  pageRepoNumbers.map(num => */ axios({
            method: "get",
            url: `https://api.github.com/users/${username}/repos?page=1&per_page=100`
        }).then(response => {setRepos(response.data)
            setLoading(true);
            console.log(response)})
    }

    async function searchUsername() {
        try {
            fetch(`https://api.github.com/users/${username}`)
            .then ((result) => {
                return result.json();
            }).then((value)=> {
                console.log(value);
                setData(value)
                setLoading(true)
            })} catch (error) {
                <EmptyState/>
            }

    }

    function InitialState (){
        if (!loading) {
            return (
                <div className='initial-block'>
                    <div className='search-block'>
                        <svg className='image-search' width="64" height="64" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.23497 0C2.79706 0 0 2.79706 0 6.23497C0 9.67288 2.79706 12.4699 6.23497 12.4699C7.63766 12.4699 8.92987 11.9995 9.97123 11.216L12.4982 13.7422C12.6697 13.9138 12.8951 14 13.1202 14C13.3453 14 13.5707 13.9138 13.7422 13.7422C14.0862 13.3983 14.0862 12.8421 13.7422 12.4982L11.216 9.97123C11.9995 8.92987 12.4699 7.63766 12.4699 6.23497C12.4699 2.79706 9.67288 0 6.23497 0ZM1.75956 6.23497C1.75956 3.76687 3.76687 1.75956 6.23497 1.75956C8.70307 1.75956 10.7104 3.76687 10.7104 6.23497C10.7104 8.70307 8.70307 10.7104 6.23497 10.7104C3.76687 10.7104 1.75956 8.70307 1.75956 6.23497Z" fill="#808080"/>
                        </svg>
                    </div>
                    <p className='initial-title'>Start with searching a GitHub user</p>
                </div>
            )
        }
    }

    function UserDetails ({details, loading}) {
        
        if (loading) {
            return (
                <div className='flex-container'>
                    <div className='results-list'>
                        <img className='img-avatar' src={details.avatar_url} alt="avatar" />
                        <h1 className='user-name'>{data.name}</h1>
                        <a className='user-login' href={`https://github.com/${username}`} target="_blank">{data.login}</a>
                        <div className='follow-container'>
                            <div className='followers-field'>
                                <img src='shared.png'></img>
                                <p className='followers-data'>{data.followers} followers</p>
                            </div>
                            <div className='following-field'>
                                <img src='provate.png'></img>
                                <p className='following-data'>{data.following} following</p>
                            </div>
                        </div>
                    </div>
                    <div className='repo-request'>
                        <h1 className='repo-title'>Repositories ({details.public_repos})</h1>
                        <div className='repo-list '>
                            {currentRepo.map(RenderRepo)}
                        </div>
                    </div>
                    
                </div>
            )
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        searchUsername();
        searchRepos();
    }

    function RenderRepo (repo) {

        return (
            <div className='row' key={repo.id}>
                <a href={`https://github.com/${username}/${repo.name}`} className='repo-name' target="_blank">{repo.name}</a>
                <div className='repo-descripe'>{repo.description}</div>
            </div>
        )
    }
    

    return (
        <div className='container'>
            <nav className='nav-header'>
                <img className='logo' src='logo.svg' alt='logo'/>
                <form className='form' onSubmit={onSubmitHandler}>
                    <button className='btn' ></button>
                    <input className='input-form' value={username} placehoder='Enter GitHub username' onChange={e => setUsername(e.target.value)}></input>
                </form>
            </nav>
            <InitialState/>
            <UserDetails details={data} loading={loading}/>
            
            <Pagination reposPerPage={reposPerPage} totalRepos={repos.length} paginate={paginate}></Pagination>
        </div>
    )
}

