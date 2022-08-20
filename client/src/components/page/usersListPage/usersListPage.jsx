import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, search]);

    const handleProfessionSelect = (item) => {
        if (search !== "") setSearch("");
        setSelectedProf(item);
        // setSearch("");
    };
    const handleChangeSearch = ({ target }) => {
        setSelectedProf(undefined);
        setSearch(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        function filterUsers(data) {
            const filteredUsers = search
                ? data.filter(
                    (user) =>
                        user.name
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) !== -1
                )
                : selectedProf
                    ? data.filter(
                        (user) =>
                            user.profession === selectedProf._id
                    )
                    : data;
            return filteredUsers.filter((u) => u._id !== currentUserId);
        }
        const filteredUsers = filterUsers(users);

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem = {selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className = "btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить</button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {
                        <>
                            <div className="container-fluid">
                                <form className="d-flex">
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        onChange={handleChangeSearch}
                                        name="search"
                                    />
                                </form>
                            </div>
                        </>
                    }
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
